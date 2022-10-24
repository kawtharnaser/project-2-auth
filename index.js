const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
require('dotenv').config()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

//link to CSS
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/css'))

// AUTHENTICATION MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.customerId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.customerId, process.env.SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        const customer = await db.customer.findByPk(decryptedIdString)
        res.locals.customer = customer
    } else res.locals.customer = null
    next()
})

// CONTROLLERS
app.use('/customers', require('./controllers/customers'))
app.use('/about', require('./controllers/about'))
app.use('/products', require('./controllers/products'))


// ROUTES
app.get('/', (req, res)=>{
    res.render('home')
})

app.listen(8001, ()=>{
    console.log('Project 2 Express Authentication')
})