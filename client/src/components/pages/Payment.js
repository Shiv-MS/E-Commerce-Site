import React, { useContext,useEffect, useState } from "react";
import { Store } from "../../store";
import "./Product.css";
import { Grid } from "@material-ui/core";
import "./Payment.css";
import Subtotal from "./Subtotal";
import returnQtys from "../../utils/getQty";
import { Link } from "react-router-dom";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

export default function Payment() {
  const {state} = useContext(Store);
  const shoppingCart = state.auth.cart;
  const user = state.auth.user;
  const getBasketTotal = (basket) =>{
    if(basket.length > 0){
    const priceArray = basket.map(({product_price}) => product_price);
    const reducer = (accumulator, currentValue) => accumulator+ currentValue;
   return priceArray.reduce(reducer) 
    } else {
      return 0
    }

}
  //
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const amount = getBasketTotal(shoppingCart);//this is suppose to be the amount to be paid
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/product/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({amount:1400})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setError(error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setSucceeded(true);
    }
  };


  
  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.name}</p>
            <p>123 Dev Route</p>
            <p>UCF, FL</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review</h3>
          </div>
          <div className="payment_items">
            <Grid
              container
              justify="center"
              className="paymentContainer"
              spacing={3}
            >
              {shoppingCart.length < 1 ? (
                <p>Add items</p>
              ) : (
                returnQtys(shoppingCart).map((item, i) => (
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    sm={12}
                    md={12}
                    xs={12}
                    style={{ maxWidth: "300px" }}
                    key={item._id + i}
                  >
                    <div className="product">
                      <div className="product_info">
                        <div>{item.product_name}</div>
                        <p className="product_price">
                          <small>$</small>
                          <strong>{item.product_price}</strong>
                        </p>
                      </div>
                      <img src={item.image} alt="" />
                      <div className="quantity">Quantity:{item.qty}</div>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
        <div className="payment_section">
       <div className="form-container">
       <form onSubmit={handleSubmit} className='payment-form' >
      <CardElement onChange={handleChange}/>
      {error?<p style={{color:'red'}}>{error.message}</p>:succeeded ?<p style={{color:'green'}}>Payment succeeded</p>:""}
    </form>
       </div>
          <div className="subtotal_container">
            <Subtotal handleSubmit={handleSubmit} value={getBasketTotal(shoppingCart)}/>
          </div>
         
        </div>
      </div>
    </div>
  );
}
