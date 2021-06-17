const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const cors = require('cors')



dotenv.config({path: './config/.env'})


// DB

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("DB connected"))

//routes

const authRoute = require('./routes/auth')
const cartRoute = require('./routes/shoppingCart')
const productRoute = require('./routes/getProducts')

app.use(express.json())
app.use(cors())
app.use('/api/user', authRoute)
app.use('/api/cart', cartRoute)
app.use('/api/products', productRoute)

app.listen(process.env.PORT, console.group("server is running"))