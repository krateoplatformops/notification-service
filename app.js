const express = require('express')
const cors = require('cors')({ origin: true, credentials: true })
const { createServer } = require('http')
const { Server } = require('socket.io')
const { logger } = require('./helpers/logger.helpers')

const app = express()
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const options = {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
}

const httpServer = createServer(app)
const io = new Server(httpServer, options)

/* Middlewares */
const callLoggerMiddleware = require('./middlewares/call-logger.middleware')
const errorLoggerMiddleware = require('./middlewares/error-logger.middleware')

app.use(callLoggerMiddleware)

const statusRoutes = require('./routes/status.routes')

app.use('/', statusRoutes)

app.post('/', (req, res) => {
  const b = req.body
  logger.debug(JSON.stringify(b))
  if (!b.message || !b.source || !b.reason) {
    res.status(400).json({
      message: 'Bad Request',
      reason: 'Missing some required fields (message, source, reason)'
    })
  }

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
