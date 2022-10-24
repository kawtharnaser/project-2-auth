let express = require('express')
let db = require('../models')
let router = express.Router()

// GET #about - display about info
router.get('/', (req, res) => {
  res.send("This is the About Page")
})

module.exports = router
