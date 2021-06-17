import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Product from './Product';
import ProductFull from './ProductFull';
import { GlobalContext } from "../../context/GlobalState";


const ProductList = () => {

    const [products, setProducts] = useState([])
    const { fullList }= useContext(GlobalContext)
    
    
    useEffect(() => {
        const getProducts = async () => {

            await axios.get("/api/products/all")
            .then((response) => {
            setProducts(response.data)
            })
        }
        getProducts()

    },[])
              
    return fullList ?  (
        <div className="roster">
            <h1>Our Products</h1>
            {products.map(product => (
                <Product key={product._id} product={product}></Product>
            ))}
            
        </div>
        
    ) : <ProductFull /> 
}

export default ProductList
