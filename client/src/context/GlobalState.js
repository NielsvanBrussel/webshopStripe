import React, { createContext, useState } from "react";


// init and create global context

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [fullList, setFullList] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [productDetails, setProductDetails] = useState()
    const [shoppingCart, setShoppingCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [email, setEmail] = useState("")

    function getDetails(product) {

        setFullList(prevFullList => !prevFullList)
        setProductDetails(product)
        
    }

    function loggedInStatus(boolean) {
        setLoggedIn(boolean)
    }

    function currentEmail(email) {
        setEmail(email)
    }

    function addToCart(productID) {
         setShoppingCart(prevState =>([...prevState, productID]))
         const newPrice = totalPrice + productDetails.price
         setTotalPrice(newPrice)
    }

    function deleteFromCart(product) {
        let array = shoppingCart
        const index = array.indexOf(product._id)
            if (index > -1) {
                array.splice(index, 1)
                setShoppingCart(array)
            }
            const newPrice = totalPrice - product.price
            setTotalPrice(newPrice)
    }

   
    return  <GlobalContext.Provider 
                value={{
                    fullList: fullList, 
                    productDetails: productDetails,
                    shoppingCart: shoppingCart,
                    totalPrice : totalPrice,
                    email: email,
                    loggedIn: loggedIn,
                    loggedInStatus,
                    currentEmail,
                    getDetails,
                    addToCart,
                    deleteFromCart,
                }}>

                    {children} 

            </GlobalContext.Provider>

}

  