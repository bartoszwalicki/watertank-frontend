import { FluxTableMetaData, InfluxDB } from '@influxdata/influxdb-client';

import { org, token, url } from './env';
import { LastMeasurementResponse } from './interfaces/last-measurement-response.interface';

/**
 * @param tankId  Tank ID, currently available 0 or 1.
 *
 * @returns Last metric
 */

module.exports = (req, res) => {
  const tankId: number = Number.parseInt(req.query.tankId, 10);

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = buildQuery(tankId);

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
      const result = {} as LastMeasurementResponse;
      returnObjects.forEach((meas) => {
        result.tankId = tankId;
        result.time = meas._time;
        result.waterLevel = meas._value;
      });

      return res.json({
        data: result,
      });
    },
  });
};

function buildQuery(tankId: number) {
  const query = `from(bucket:"watertank")
  |> range(start: -1m)
  |> filter(fn: (r) => r._measurement == "waterlevel")
  |> filter(fn: (r) => r["_field"] == "value")
  |> filter(fn: (r) => r["watertank"] == "${tankId}")
  |> last()`;

  return query;
}
