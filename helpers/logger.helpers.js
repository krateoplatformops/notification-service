const winston = require('winston')

const { envConstants } = require('../constants')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: envConstants.LOG_LEVEL,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.errors({ stack: true })
      )
    })
  ]
})

module.exports = {
  logger
}
