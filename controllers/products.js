let express = require('express')
let db = require('../models')
let router = express.Router()




// // GET products - display products 
// router.get('/', async (req, res) => {
//   try {
//     let allProducts = await db.products.findAll()
//     res.render('products/show.ejs', {allProducts})
//   } 
//   catch(err) {
//     console.log(err)
//     res.json(err)
// }


// })


//GET products - display products 
router.get('/', (req, res) => {
db.product.findAll()
.then((products) => {
  res.render('products/show', { products: products })
})
.catch((error) => {
  res.status(400).render('main/404')
})
})

module.exports = router