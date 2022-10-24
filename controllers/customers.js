const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')

router.get('/new', (req, res)=>{
    res.render('customers/new.ejs')
})

router.post('/', async (req, res)=>{
    const [newCustomer, created] = await db.customer.findOrCreate({where:{email: req.body.email}})
   
    if(!created){
        console.log('customer already exists')
        res.render('customers/login.ejs', {error: 'Looks like you already have an account! Try logging in :)'})
    } else {
        console.log('new user')
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newCustomer.password = hashedPassword
        await newCustomer.save()
        const encryptedCustomerId = cryptojs.AES.encrypt(newCustomer.id.toString(), process.env.SECRET)
        const encryptedCustomerIdString = encryptedCustomerId.toString()
        res.cookie('customerId', encryptedCustomerIdString)
        res.redirect('/')
    }
})

router.get('/login', (req, res)=>{
    res.render('customers/login.ejs')
})

router.post('/login', async (req, res)=>{
    const customer = await db.customer.findOne({where: {email: req.body.email}})
    if(!customer){
        console.log('customer not found')
        res.render('customers/login', { error: "Invalid email/password" })
    } else if(!bcrypt.compareSync(req.body.password, customer.password)) {
        console.log('password incorrect')
        res.render('customers/login', { error: "Invalid email/password" })
    } else {
        console.log('logging in the customer!!!')
        const encryptedCustomerId = cryptojs.AES.encrypt(customer.id.toString(), process.env.SECRET)
        const encryptedCustomerIdString = encryptedCustomerId.toString()
        res.cookie('customerId', encryptedCustomerIdString)
        res.redirect('/')
    }
})

router.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('customerId')
    res.redirect('/')
})

router.get('/profile', (req, res)=>{
    res.render('customers/profile.ejs')
})

module.exports = router