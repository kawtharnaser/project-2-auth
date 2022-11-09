let express = require('express')
let db = require('../models')
let router = express.Router()


let bodyParser = require('body-parser')
const session = require('express-session')



router.use(session({secret: "shhh"}))
router.use(bodyParser.urlencoded({extended:true}))



//function to check if the clicked on product exists in the cart previously or not
//we pass this function two parameters, the session: cart, and the id of the clicked on product: id
function productAdded(cart, id){
    //loop over the cart
    for(let i=0; i<cart.length; i++){
        //get each product in the cart, then compare it to the clicked on product id
        if(cart[i].id == id){
            //if the ids match then product is already added
            return true
        }
    }
    //if not then the product doesnt live in the cart yet
    return false
}


//this function calculates the total price of all products in cart
function concatenatePrice(cart, req){
    //we start with total =0
    total = 0
    //loop over all products in the cart session
    for(let i=0; i<cart.length; i++){
        //add each product price one by one to the total price, multiplied by its quantity
        total = total + (cart[i].productPrice*cart[i].quantity)
    }
    //create a total key in our session that store the total as its value and then we return it
    req.session.total = total
    return total
}




//CODE starts here
// //GET the attributes we stored in the add to cart button form, 
// GET all the product details
router.post('/add-to-cart/:id', (req, res) => {

    //store all product details in variables
    const id = req.body.id
    const productName = req.body.productName
    const productPrice = req.body.productPrice
    const stock = req.body.stock
    const quantity = req.body.quantity
    const productImg = req.body.productImg

    //pass these variables as attributes of the product object
    const product = {
        id: id,
        productName: productName,
        productPrice: productPrice,
        stock: stock,
        quantity: quantity,
        productImg: productImg
    }
    
    
    //console log to debug
    console.log(product)



    //we need to check if we already have a session for that user or not yet
    //if we do then: if
    //if we don't then: else

    if(req.session.cart){
        //store the session in a variable cart
        const cart = req.session.cart
        //now check if that product that the user just clicked on is already in the cart or not (fun above)
        //if it's in the cart then we wont do anything, cuz its already added no need to add it again
        // but if its not in the cart then we have to push that product to the cart session array
        if(!productAdded(cart, id)){
            cart.push(product)
            //add price of the added product to the total price
            concatenatePrice(cart, req)
        }
    }
    
    //now if we don't have a session, we will need to create one
    //this session is equal to an array of that product that was just added by the user
    // we stored that session in a variable called cart
    else{
    req.session.cart = [product]
    const cart = req.session.cart
    //add price of the added product to the total price
    concatenatePrice(cart, req)
    }
    

    //CHANGE THIS
    res.redirect('/products')
})


//display the cart and the total in our cart page
router.get('/', (req, res)=>{
    let cart = req.session.cart
    let total = req.session.total

    //pass the cart and total to the ejs page 
    res.render('cart/show', {cart:cart,total:total})
})


module.exports = router
