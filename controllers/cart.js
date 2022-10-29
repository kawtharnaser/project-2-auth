let express = require('express')
let db = require('../models')
let router = express.Router()


let bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))


// //GET the attributes we stored in the add to cart button form, 
// GET all the product details
router.post('/add-to-cart', (req, res) => {
let productId = req.body.productId
let productName = req.body.productName
let productPrice= req.body.productPrice
let stock = req.body.stock
let quantity= req.body.quantity
let productImg= req.body.productImg

let product = {
    productId:productId,
    productName: productName,
    productPrice: productPrice,
    stock:stock,
    quantity:quantity,
    productImg:productImg
}

res.render('cart/show', {product: product})
})


// router.get('/', (req, res)=>{
//     res.render('cart/show', {product: product})
// })

module.exports = router