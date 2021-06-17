import React, { useContext } from 'react'
import { GlobalContext } from "../../context/GlobalState";


const Product = ({ product }) => {

    const { getDetails } = useContext(GlobalContext)
    const onClick = e => {
        e.preventDefault()
        getDetails(product)
    }
    return (
        <div className="dunno">
            <button onClick={onClick} className="button1"><h1>{product.name}</h1>
            <p>Price: €{product.price}, Brand: {product.brand}</p></button>
        </div>
    )
}

export default Product
