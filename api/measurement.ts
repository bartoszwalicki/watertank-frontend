import { InfluxDB, Point, WritePrecision } from '@influxdata/influxdb-client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bucket, org, token, url } from './env';

module.exports = (req: VercelRequest, res: VercelResponse) => {
  const securityCode: number = Number.parseInt(
    req.query.security as string,
    10
  );
  const tank1MeasMm: number = Number.parseInt(
    req.query.tank1Meas as string,
    10
  );
  const tank2MeasMm: number = Number.parseInt(
    req.query.tank2Meas as string,
    10
  );

  if (securityCode !== 467467) {
    return res.status(401).json({
      status: 'unauthorized',
    });
  }

  console.log(
    `Measurement tank 1 ${tank1MeasMm} mm\n\rMeasurement tank 2 ${tank2MeasMm} mm`
  );

  const writeApi = new InfluxDB({ url, token, timeout: 8000 }).getWriteApi(
    org,
    bucket,
    WritePrecision.ns
  );

  console.log(url, token, bucket, org);

  const point1 = new Point('waterlevel')
    .tag('watertank', '1')
    .floatField('value', tank1MeasMm);
  writeApi.writePoint(point1);

  const point2 = new Point('waterlevel')
    .tag('watertank', '2')
    .floatField('value', tank2MeasMm);
  writeApi.writePoint(point2);

  writeApi
    .close()
    .then(() => {
      console.log('Data written to influxdb.');
      return res.json({
        status: 'success',
      });
    })
    .catch((e) => {
      console.error(e);
      return res.json({
        status: 'success',
      });
    });
};
