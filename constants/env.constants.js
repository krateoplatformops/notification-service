module.exports = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  NATS_URI: process.env.NATS_URI,
  CLOUD_EVENT_SUBJECT: process.env.CLOUD_EVENT_SUBJECT || 'io.krateo.socket',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
}
