const express = require('express')
const router = express.Router()

router.get('/ping', (req, res) => {
  res.status(200).send('Socket Service')
})

router.get('/healthz', (req, res) => {
  res.status(200).send('Socket Service')
})

module.exports = router
