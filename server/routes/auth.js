const router = require ('express').Router()
const User = require ('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')




router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // check if user is in database

    const emailExists = await User.findOne({ email: req.body.email })
    const nameExists = await User.findOne({ name: req.body.name })
    if (nameExists && emailExists) return res.status(400).send('Name and Email already in use!')
    if (emailExists) return res.status(400).send('Email already in use!')
    if (nameExists) return res.status(400).send('Name already in use!')
    
    // PWhashing

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    // create new user 

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id})
    } catch (err) {
        res.status(400).send(err)
    }
})

// login

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // check if user is in database

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email!')
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password!')

    // create webtoken

    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    res.header('auth-token', token).send(token)
    
       

})



module.exports = router