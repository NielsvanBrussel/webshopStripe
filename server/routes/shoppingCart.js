const router = require ('express').Router()
const verify = require ('./verifyToken')
const dotenv = require('dotenv')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const uuid = require('uuid')

router.post('/checkout', (req, res) => {
    const {productPrice, token} = req.body
    
    console.log("PRICE", productPrice);
    const idempontencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: productPrice * 100,
            currency: 'EUR',
            customer: customer.id,
            description: `purchase of product
            `
        }, {idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})





module.exports = router