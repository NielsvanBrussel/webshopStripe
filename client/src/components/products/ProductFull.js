import React, { useContext } from 'react'
import { GlobalContext } from "../../context/GlobalState";

const ProductFull = () => {

    const { getDetails, productDetails, addToCart } = useContext(GlobalContext)
    const returnButton = e => {
        e.preventDefault()
        getDetails()
    }

    const buyButton = e => {
        e.preventDefault()
        addToCart(productDetails._id)
        getDetails()

    }

    return (
        <div>
            <div>
                <button className="btn-large red"onClick={returnButton}>Back to all products</button>  
            </div>
            <div>        
                <h1>{productDetails.name}</h1>
                <p>price: €{productDetails.price}</p>
                <p>{productDetails.description}</p>
                <p>brand: {productDetails.brand}</p>
                <p>type: {productDetails.type}</p>
                <button className="btn-large red" onClick={buyButton}>BUY</button>
            </div>                         
        </div>
    )
}

export default ProductFull