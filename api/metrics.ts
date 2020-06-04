import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client';

import { url, token, org } from './env';

import { MeasurmentType } from './enums/measurment-type.enum';
import { TimeWindow } from './enums/time-window.enum';
import { MeasurmentReponse } from './interfaces/measurment-response.interface';

/**
 * @param tankId  Tank ID, currently available 0 or 1.
 * @param metric Metric to return - `w` - waterlevel from cap in mm or `t` - temperature in celcius.
 * @param timeWindow Time window.
 *
 * @returns Array of measurment objects
 */

module.exports = (req, res) => {
  const tankId: number = Number.parseInt(req.query.tankId, 10);
  const metric: MeasurmentType = req.query.metric;
  const timeWindow: TimeWindow = req.query.timeWindow;

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = buildQuery(timeWindow, metric, tankId);

  const resultTable: Array<MeasurmentReponse> = [];

  queryApi.queryRows(fluxQuery, {
    next(row: string[], tableMeta: FluxTableMetaData) {
      const dataObject = tableMeta.toObject(row);

      const measurment = {
        field: dataObject._field,
        tankId: dataObject.tank,
        time: dataObject._time ? dataObject._time : dataObject._stop,
        value: dataObject._value,
      } as MeasurmentReponse;

      resultTable.push(measurment);
    },
    error(error: Error) {
      res.status(500);
      return res.json({
        data: [],
        error: error.message,
      });
    },
    complete() {
      return res.json({
        data: resultTable,
      });
    },
  });
};

function buildQuery(
  timeWindow: TimeWindow,
  metric: MeasurmentType,
  tankId: number
) {
  const query = `from(bucket:"watertank")
  |> range(start: -${timeWindow})
  |> filter(fn: (r) => r._measurement == "waterlevel")
  |> filter(fn: (r) => r["_field"] == "${metric}")
  |> filter(fn: (r) => r["tank"] == "${tankId}")`;

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
