import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import { logoutUser } from "../../store/actions/authActions";
import API from "../../utils/apiHelper";
import './ShoppingCart.css'
import Subtotal from './Subtotal.js';


const ShopppingCart = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;
  const [shoppingCart, setShoppingCart] = useState([]);
  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log({ err }));
    //Getting Cart
    API.get_cart()
      .then((res) => {
        console.log({ res });
        setShoppingCart(res.data);
      })
      .catch((err) => console.log({ err }));
  }, [state, props]);

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };
  return (
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
          shoppingCart.map((item,i) => <li key={(item._id)+i}>{item.product_name}</li>)
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
