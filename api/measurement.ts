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

  return res.json({
    status: 'success',
  });
};
