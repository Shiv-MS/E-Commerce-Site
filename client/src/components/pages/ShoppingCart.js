import React, { useEffect, useContext } from "react";
import { Store } from "../../store";
import { logoutUser } from "../../store/actions/authActions";
import { UPDATE_CART } from "../../store/actions/types";
import API from "../../utils/apiHelper";
import "./ShoppingCart.css";
import "./Product.css";
import Subtotal from "./Subtotal.js";
import returnQtys from "../../utils/getQty";

const ShopppingCart = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;
  const shoppingCart = state.auth.cart;
  // console.log(shoppingCart)

  const getBasketTotal = (basket) =>{
    if(basket.length > 0){
    const priceArray = basket.map(({product_price}) => product_price);
    const reducer = (accumulator, currentValue) => accumulator+ currentValue;
   return priceArray.reduce(reducer) 
    } else {
      return 0
    }

}
  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => {
        // console.log({ res });
      })
      .catch((err) => console.log({ err }));
    // Getting Cart
  }, [state, props]);

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };
  const deleteItem = (id) => {
    API.delete_cart(id).then((res) => {
      dispatch({ type: UPDATE_CART, payload: res.data });
      // console.log(res);
    });
  };

  return (
    
      <div className="checkout">
        <div className="checkout_left">
          <img
            className="checkout_ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt="promotional banner"
          />
          
            <h2 className="checkout_title">
              {" "}
              Your Shopping Basket {user.name}
              <button
                className="logOut"
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
            </h2>
            <ul>
              {shoppingCart.length < 1 ? (
                <p>Your Shopping Cart is Empty</p>
              ) : (
                returnQtys(shoppingCart).map((item, i) => (
                  <div className="product" key={item._id + i}>
                    <div className="product_info">
                      <div>{item.product_name}</div>
                      <p className="product_price">
                        <small>$</small>
                        <strong>{item.product_price}</strong>
                      </p>
                    </div>
                    <div className="img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="quantity">Quantity:{item.qty}</div>
                    <button
                      id={item._id}
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                    >
                      Remove from cart
                    </button>
                  </div>
                ))
              )}
            </ul>
          
        </div>
        <div className="checkout_right">
          <Subtotal shopping={true} value={getBasketTotal(shoppingCart)}/>
        </div>
      </div>
    
  );
};

export default ShopppingCart;
