const express = require('express')
const helmet = require('helmet')
const cors = require('cors')({ origin: true, credentials: true })
const { createServer } = require('http')
const { Server } = require('socket.io')
const nats = require('./helpers/nats.helpers')
const { logger } = require('./helpers/logger.helpers')
const EventEmitter = require('events')
const { nodeConstants } = require('./constants')

const app = express()
app.use(helmet())
app.use(cors)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const ee = new EventEmitter()
nats.subscribe(ee)

io.on('connection', (socket) => {
  logger.info('New client connected')

  ee.on(nodeConstants.EVENT_EMITTER, (text) => {
    socket.emit('notifications', text)
  })

  socket.on('disconnect', () => {
    logger.info('Client disconnected')
  })
})

module.exports = httpServer
