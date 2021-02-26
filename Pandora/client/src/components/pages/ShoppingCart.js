import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import { logoutUser } from "../../store/actions/authActions";
// import { UPDATE_CART } from "../../store/actions/types";
import API from "../../utils/apiHelper";
import './ShoppingCart.css';
import Subtotal from './Subtotal.js';

const ShopppingCart = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;
  const shoppingCart = state.auth.cart;
  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log({ err }));
    // Getting Cart
  }, [state, props]);

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };
  const deleteItem = (id) => {};
  return (
    // <div>

    //   <ul>
    //      {shoppingCart.length < 1 ? (
    //        <p>Add items</p>
    //     ) : (
    //       shoppingCart.map((item,i) => <li key={item._id+i}>{item.product_name}</li>)
    //     )}
    // </ul>
    //   <button
    //     className="btn btn-large waves-effect waves-light hoverable blue accent-3"
    //     style={{
    //       width: "150px",
    //       borderRadius: "3px",
    //       letterSpacing: "1.5px",
    //       marginTop: "1rem",
    //     }}
    //     onClick={onLogoutClick}
    //   >
    //     Logout
    //   </button>
    // </div>
    <div>
      <div className="checkout">
        <div className="checkout_left">
          <img
            className="checkout_ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          />
          <div>
            <h2 className="checkout_title"> Your Shopping Basket</h2>
            <ul>
              {shoppingCart.length < 1 ? (
                <p>Add items</p>
              ) : (
                shoppingCart.map((item, i) => (
                  <li key={item._id + i}>
                    <div>{ item.product_name}</div> 
                    <div>{ item.product_price}</div>
                    <button id={item.id}>Remove from cart</button>
                    </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
      <button
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem",
        }}
        onClick={onLogoutClick}
      >
        Logout
      </button>
    </div>
  );
};

export default ShopppingCart;
