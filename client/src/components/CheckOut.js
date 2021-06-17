
import React, { useContext } from 'react'
import CheckOutItem from "./checkout/CheckOutItem"
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';

import { GlobalContext } from "../context/GlobalState";

const Checkout = () => {

    
    const { shoppingCart, totalPrice, email } = useContext(GlobalContext)

    const payButton = e => {
        e.preventDefault()
        }

    const makePayment = token => {

        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        
        return axios.post("/api/checkout", { token: token, totalPrice: totalPrice }, config)
          .then(res => {
            const  { status } = res
            console.log("STATUS ", status)
          })
          .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {shoppingCart.map(item => (
                <CheckOutItem key={item._id} item={item} />
            ))}

             <h1>Total Price: €{totalPrice} </h1>
            <StripeCheckout
                stripeKey="pk_test_51IxrukBsygE4MtkGrS0lLaRwiRGuN7DdNoKtshVGI1f5t7KTqPsY2ZDCCsCkxM402iOwTljsHe5EnavwzJNDuTda00Y1huoXwT" 
                token={makePayment}
                name="cart"
                amount={totalPrice * 100}
                email={email}
                currency="EUR"
            >

                <button className="btn-large red" onClick={payButton}>PAY</button>  

            </StripeCheckout> 
        </div>
    )
}

export default Checkout