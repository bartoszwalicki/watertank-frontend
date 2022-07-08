/**
 * @param tankId  Tank ID, currently available 0 or 1.
 * @param measurement  Measurement in mm.
 * @returns Last metric
 */

module.exports = (req, res) => {
  const securityCode: number = Number.parseInt(req.query.security, 10);
  const tankId: number = Number.parseInt(req.query.tankId, 10);
  const measurementMm: number = Number.parseInt(req.query.measurement, 10);

  if (securityCode !== 467467) {
    res.status = 401;
    return res;
  }

  console.log(`Measurement ${tankId}: ${measurementMm} mm`);

  res.status = 200;
  return res;
};
