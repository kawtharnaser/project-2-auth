let express = require('express')
let db = require('../models')
let router = express.Router()

// GET products - display products 
router.get('/', (req, res) => {
  res.send("This is the Products Page")
})

module.exports = router