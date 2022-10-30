let express = require('express')
let db = require('../models')
let router = express.Router()


let bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))







router.get('/', async (req, res)=>{
    
    let customer = await db.customer.findByPk(res.locals.customer.id, {
        include: [{
            model: db.order,
            include: [db.product]
        }]
    })


    // res.json(customer)
    res.render('cart/show.ejs', {customer: customer})
    // res.render('cart.ejs')
})


router.post('/add-to-cart/:productId', async (req,res) => {

    let customer = res.locals.customer
    let product = await db.product.findOne({
        id: req.params.productId
    })
    // create new order
    let newOrder = await db.order.create({
        // userId: user.id,
        complete: 'false'
    })
    let newProductOrder = await db.ordersProducts.findOrCreate({
        where: {
            orderId: newOrder.id,
            productId: req.params.productId
        }
    })

    await customer.addOrder(newOrder)
    // await customer.addProduct(product)

    // res.redirect('/products')
    // add product to an order
    // add order to the user

})















// //GET the attributes we stored in the add to cart button form, 
// GET all the product details
// router.post('/add-to-cart/:productId',async (req, res) => {
// let productId = req.body.productId
// let productName = req.body.productName
// let productPrice= req.body.productPrice
// let stock = req.body.stock
// let quantity= req.body.quantity
// let productImg= req.body.productImg

// let product = {
//     productId:productId,
//     productName: productName,
//     productPrice: productPrice,
//     stock:stock,
//     quantity:quantity,
//     productImg:productImg
// }




// try {
//     let c = res.locals.customer
//     console.log('c', c)
//     let [order, orderCreated]= await db.order.findOrCreate({
//         where: {
//              id: req.body.id,
//              customerId: c.id,
//              customerName: c.firstName,
//             //  complete: req.body.complete

//         }
//     })
//     let product= await db.product.findAll({
//         where: {
//             id: req.body.id
//         }
//     })
//     await order.addProduct(product)
//     console.log("this is the order" + order)
//     res.render('cart/show')

    
// } catch (error) {

//     console.log("The erorrrrr issss" + error)
    
// }


// })

module.exports = router