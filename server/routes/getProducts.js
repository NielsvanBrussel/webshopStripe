const router = require ('express').Router()
const Product = require ('../model/Product')
const verify = require ('./verifyToken')



router.get('/all', async (req, res) => {
    try { 
        
        const allProducts = await Product.find()
        res.send(allProducts)
        
    } catch (err) { 
        res.send(err)
        }
    
})

router.get('/:id', async (req, res) => {
   try { 
        const oneProduct = await Product.findById(req.params.id)
        res.send(oneProduct)

    } catch (err) {
        res.send(err)
        }

})

module.exports = router