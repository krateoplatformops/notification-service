const { connect, StringCodec } = require('nats')
const { logger } = require('./logger.helpers')
const { envConstants, nodeConstants } = require('../constants')

const subscribe = async (ee) => {
  try {
    logger.info('Connecting to NATS')
    const nc = await connect({ servers: envConstants.NATS_URI })
    logger.info('Connected to NATS')

    const sc = StringCodec()

    const sub = nc.subscribe(envConstants.CLOUD_EVENT_SUBJECT)

    for await (const m of sub) {
      const event = JSON.parse(sc.decode(m.data))
      logger.debug(`NATS - Message received ${JSON.stringify(event.data)}`)

      ee.emit(nodeConstants.EVENT_EMITTER, event.data)
    }
  } catch (err) {
    logger.error(`Error on NATS: ${err.message}`)
  }
}

module.exports = {
  subscribe
}
