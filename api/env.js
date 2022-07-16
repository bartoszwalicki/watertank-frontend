const url = process.env["INFLUXDB_URL"];
const token = process.env["INFLUXDB_TOKEN"];
const org = process.env["INFLUXDB_ORG"];
const bucket = "watertank";

// Values in mm, measured from sensor to water level
const watertankConfig = {
  tank1MaximumLevel: 712,
  tank2MaximumLevel: 712,
};

module.exports = {
  url,
  token,
  org,
  bucket,
  watertankConfig,
};
