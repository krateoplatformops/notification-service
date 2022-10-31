const express = require('express')
const cors = require('cors')({ origin: true, credentials: true })
const responseTime = require('response-time')
const { createServer } = require('http')
const { Server } = require('socket.io')
const logger = require('./service-library/helpers/logger.helpers')
const validateKeys = require('object-key-validator')

const app = express()
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(responseTime({ suffix: false, digits: 0 }))

const options = {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
}

const rule = { $and: ['message', 'time', 'level', 'reason', 'source'] }

const httpServer = createServer(app)
const io = new Server(httpServer, options)

/* Middlewares */
const callLoggerMiddleware = require('./service-library/middlewares/call-logger.middleware')
const errorLoggerMiddleware = require('./service-library/middlewares/error-logger.middleware')

app.use(callLoggerMiddleware)

const statusRoutes = require('./service-library/routes/status.routes')

app.use('/', statusRoutes)

app.post('/', (req, res) => {
  logger.debug(req.body)

  if (!validateKeys(rule, req.body)) {
    return res.status(400).json({
      message: 'Bad Request',
      reason: `Missing some required fields (${rule.$and.join(', ')})`
    })
  }

  console.log(req.body)

  io.sockets.emit('notifications', req.body)
  res.status(200).json({ message: 'ok' })
})

app.use(errorLoggerMiddleware)

io.on('connection', (socket) => {
  logger.info('New client connected')

  socket.on('disconnect', () => {
    logger.info('Client disconnected')
  })
})

module.exports = httpServer
