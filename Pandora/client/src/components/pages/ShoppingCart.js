import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import { logoutUser  } from "../../store/actions/authActions";
import { UPDATE_CART} from "../../store/actions/types";
import API from "../../utils/apiHelper";

const ShopppingCart = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;
 const shoppingCart = state.auth.cart;
  // const [shoppingCart, setShoppingCart] = useState([]);
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
  const deleteItem =(id)=>{


  }
  return (
    <div>

      <ul>
         {shoppingCart.length < 1 ? (
           <p>Add items</p>
        ) : (
          shoppingCart.map((item,i) => <li key={item._id+i}>{item.product_name}</li>)
        )}
    </ul>
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
