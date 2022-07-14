import { HttpError, InfluxDB, Point } from '@influxdata/influxdb-client';
import { bucket, org, token, url } from './env';

module.exports = (req, res) => {
  const securityCode: number = Number.parseInt(req.query.security, 10);
  const tank1MeasMm: number = Number.parseInt(req.query.tank1Meas, 10);
  const tank2MeasMm: number = Number.parseInt(req.query.tank2Meas, 10);

  if (securityCode !== 467467) {
    return res.status(401).json({
      status: 'unauthorized',
    });
  }

  console.log(
    `Measurement tank 1 ${tank1MeasMm} mm\n\rMeasurement tank 2 ${tank2MeasMm} mm`
  );

  writeInflux(tank1MeasMm, tank2MeasMm);

  return res.json({
    status: 'success',
  });
};

function writeInflux(watertankMeas1: number, watertankMeas2: number): void {
  console.log('*** WRITE POINTS ***');
  // create a write API, expecting point timestamps in nanoseconds (can be also 's', 'ms', 'us')
  const writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, 'ns');
  // setup default tags for all writes through this API
  writeApi.useDefaultTags({ location: 'vercelFunction' });

  // write point with the current (client-side) timestamp
  const point1 = new Point('waterlevel')
    .tag('watertank', '1')
    .floatField('value', watertankMeas1);
  writeApi.writePoint(point1);
  console.log(` ${point1}`);
  // write point with a custom timestamp
  const point2 = new Point('waterlevel')
    .tag('watertank', '2')
    .floatField('value', watertankMeas2)
    .timestamp(new Date()); // can be also a number, but in writeApi's precision units (s, ms, us, ns)!
  writeApi.writePoint(point2);
  console.log(` ${point2.toLineProtocol(writeApi)}`);

  // WriteApi always buffer data into batches to optimize data transfer to InfluxDB server.
  // writeApi.flush() can be called to flush the buffered data. The data is always written
  // asynchronously, Moreover, a failed write (caused by a temporary networking or server failure)
  // is retried automatically. Read `writeAdvanced.js` for better explanation and details.
  //
  // close() flushes the remaining buffered data and then cancels pending retries.
  writeApi
    .close()
    .then(() => {
      console.log('FINISHED ... now try ./query.ts');
    })
    .catch((e) => {
      console.error(e);
      if (e instanceof HttpError && e.statusCode === 401) {
        console.log('Run ./onboarding.js to setup a new InfluxDB database.');
      }
      console.log('\nFinished ERROR');
    });
}
