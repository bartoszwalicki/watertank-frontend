import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client';
import { url, token, org } from './env';

module.exports = (req, res) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery =
    'from(bucket:"watertank") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "waterlevel") |> filter(fn: (r) => r["_field"] == "t") |> filter(fn: (r) => r["tank"] == "0")';
  const resultTable = [];

  console.log('*** QUERY ROWS ***');
  // performs query and receive line table metadata and rows
  // https://v2.docs.influxdata.com/v2.0/reference/syntax/annotated-csv/
  queryApi.queryRows(fluxQuery, {
    next(row: string[], tableMeta: FluxTableMetaData) {
      const o = tableMeta.toObject(row);
      const res = {
        time: new Date(o._time),
        value: o._value,
      };
      resultTable.push(res);
    },
    error(error: Error) {
      console.error(error);
    },
    complete() {
      return res.json({
        data: resultTable,
      });
    },
  });
};
