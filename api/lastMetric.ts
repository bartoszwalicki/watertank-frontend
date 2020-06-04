import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client';

import { url, token, org } from './env';

import { MeasurmentType } from './enums/measurment-type.enum';
import { MeasurmentReponse } from './interfaces/measurment-response.interface';

/**
 * @param tankId  Tank ID, currently available 0 or 1.
 * @param field metric to return - `w` - waterlevel from cap in mm or `t` - temperature in celcius.
 *
 * @returns Last metric
 */

module.exports = (req, res) => {
  const tankId: number = Number.parseInt(req.query.tankId, 10);
  const metric: MeasurmentType = req.query.metric;

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = buildQuery(metric, tankId);

  let result: MeasurmentReponse;

  queryApi.queryRows(fluxQuery, {
    next(row: string[], tableMeta: FluxTableMetaData) {
      const dataObject = tableMeta.toObject(row);

      const measurment = {
        field: dataObject._field,
        tankId: dataObject.tank,
        time: dataObject._time ? dataObject._time : dataObject._stop,
        value: dataObject._value,
      } as MeasurmentReponse;

      result = measurment;
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
        data: result,
      });
    },
  });
};

function buildQuery(metric: MeasurmentType, tankId: number) {
  const query = `from(bucket:"watertank")
  |> range(start: -1m)
  |> filter(fn: (r) => r._measurement == "waterlevel")
  |> filter(fn: (r) => r["_field"] == "${metric}")
  |> filter(fn: (r) => r["tank"] == "${tankId}")
  |> last()`;

  return query;
}
