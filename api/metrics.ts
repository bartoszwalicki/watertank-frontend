import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client';

import { url, token, org } from './env';

import { TimeWindow } from './enums/time-window.enum';
import { MeasurmentReponse } from './interfaces/measurment-response.interface';

/**
 * @param tankId  Tank ID, currently available 0 or 1.
 * @param timeWindow Time window.
 *
 * @returns Array of measurment objects
 */

module.exports = (req, res) => {
  const tankId: number = Number.parseInt(req.query.tankId, 10);
  const timeWindow: TimeWindow = req.query.timeWindow;

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = buildQuery(timeWindow, tankId);

  const returnObjects = [];

  queryApi.queryRows(fluxQuery, {
    next(row: string[], tableMeta: FluxTableMetaData) {
      const dataObject = tableMeta.toObject(row);

      returnObjects.push(dataObject);
    },
    error(error: Error) {
      res.status(500);
      return res.json({
        data: [],
        error: error.message,
      });
    },
    complete() {
      const resultTable: Array<MeasurmentReponse> = [];

      returnObjects.forEach((meas) => {
        const singleResult = {} as MeasurmentReponse;

        singleResult.tankId = tankId;
        singleResult.time = meas._time ? meas._time : meas._stop;
        if (meas._field === 'w') {
          singleResult.field = 'w';
          singleResult.waterLevel = meas._value;
        }
        if (meas._field === 't') {
          singleResult.field = 't';
          singleResult.temperature = meas._value;
        }

        resultTable.push(singleResult);
      });

      return res.json({
        data: resultTable,
      });
    },
  });
};

function buildQuery(timeWindow: TimeWindow, tankId: number) {
  const query = `from(bucket:"watertank")
  |> range(start: -${timeWindow})
  |> filter(fn: (r) => r._measurement == "waterlevel")
  |> filter(fn: (r) => r["tank"] == "${tankId}")
  |> aggregateWindow(every: 5m, fn: median, createEmpty: false)
  |> yield(name: "median")`;

  switch (timeWindow) {
    case TimeWindow.hour:
      return query;
    case TimeWindow.day:
      return `${query}
        |> window(every: 5m)
        |> mean()`;
    case TimeWindow.week:
      return `${query}
        |> window(every: 10m)
        |> mean()`;
    case TimeWindow.month:
      return `${query}
        |> window(every: 30m)
        |> mean()`;
    default:
      return query;
  }
}
