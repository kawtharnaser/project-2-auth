let express = require('express')
let db = require('../models')
let router = express.Router()

// // GET products - display products 
router.get('/', (req, res) => {
  res.send("This is the Products Page")
})


//GET products - display products 
// router.get('/show', (req, res) => {
// db.product.findAll()
// .then((products) => {
//   res.render('products/show', { products: products })
// })
// .catch((error) => {
//   res.status(400).render('main/404')
// })
// })




module.exports = router