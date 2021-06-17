import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import { GlobalContext } from "../../context/GlobalState";


const CheckOutItem = (item) => {
    
    const [Product, setProduct] = useState([])
    const { deleteFromCart } = useContext(GlobalContext)
    
    console.log(item.item)
    
      
    useEffect(() => {
        const getProducts = async () => {
             
            await axios.get(`/api/products/${item.item}`)
            .then((res) => {
                 setProduct(res.data)
                 console.log(res.data)                 
            })        
        }
        getProducts() 
    },[item])

    console.log(Product.price)

   
    const deleteProduct = e => {
        e.preventDefault()
        deleteFromCart(Product)  
    }

    
    return (
        <div>
        
            <div>
                <div className="checkoutGrid">Product: {Product.name}</div>
                <div className="checkoutGrid">Price: {Product.price}</div>
                <button className="checkoutGrid" onClick={deleteProduct}>X</button>
                <hr></hr>
            </div>
        
        </div>
    ) 
}

export default CheckOutItem
