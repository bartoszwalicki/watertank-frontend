/** InfluxDB v2 URL */
const url = process.env['INFLUXDB_URL']
/** InfluxDB authorization token */
const token = process.env['INFLUXDB_TOKEN']
/** Organization within InfluxDB URL  */
const org = process.env['INFLUXDB_ORG']
/**InfluxDB bucket used in examples  */
const bucket = 'watertank'

module.exports = {
  url,
  token,
  org,
  bucket
}
