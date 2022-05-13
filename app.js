const express = require('express')
const helmet = require('helmet')
const cors = require('cors')({ origin: true, credentials: true })
const { createServer } = require('http')
const { Server } = require('socket.io')
const { logger } = require('./helpers/logger.helpers')

const app = express()
app.use(helmet())
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

/* Middlewares */
const callLoggerMiddleware = require('./middlewares/call-logger.middleware')
const errorLoggerMiddleware = require('./middlewares/error-logger.middleware')

app.use(callLoggerMiddleware)

const statusRoutes = require('./routes/status.routes')

app.use('/', statusRoutes)

app.post('/', (req, res) => {
  logger.debug(JSON.stringify(req.body))

  if (req.body.deploymentId) {
    io.sockets.emit(req.body.deploymentId, {
      deploymentId: req.body.deploymentId
    })
  } else {
    io.sockets.emit('notifications', {
      ...req.body
    })
  }
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
