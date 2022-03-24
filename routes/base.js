const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Krateo Service Socket')
})

router.get('/ping', (req, res) => {
  res.status(200).send('Krateo Service Socket')
})

module.exports = router
