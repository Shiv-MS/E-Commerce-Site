import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../store";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { UPDATE_CART } from "../../store/actions/types";

function Header({ productQuery, setProductQuery, searchProduct }) {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;

  //currentUser
  useEffect(() => {
    API.get_cart()
      .then((res) => {
        // console.log({ res });
        dispatch({ type: UPDATE_CART, payload: res.data });
      })
      .catch((err) => console.log({ err }));
  }, [user]);
  //useEfect getting the cart when it first load and passing the items and count to the global sate

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProduct(productQuery);
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://trufit-assets.s3.amazonaws.com/003Project/images/images.png"
          alt=""
          className="header_logo"
        />
      </Link>
      <div style={{width:'100%'}}>
        <form onSubmit={handleSubmit} className="header_search">
          <input
            type="text"
            className="header_searchInput"
            value={productQuery}
            onChange={(e) => {
              setProductQuery(e.target.value);
            }}
          />
          <SearchIcon className="header_searchIcon" onClick={handleSubmit} />
        </form>
      </div>
      {/* {logo} */}

      <div className="header_nav">
        <Link to="/login">
          <div className="header_option">
            <span className="header_optionLineOne">
              Hello {user.name ? `${user.name}` : "Guest"}
            </span>
            <span className="header_optionLineTwo">
              {user.name ? "Shopping Cart" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Return</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Coming</span>
          <span className="header_optionLineTwo">Soon...</span>
        </div>

        <div className="header_optionBasket">
          <Link to="/shoppingCart">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {user.name ? state.auth.cart.length : ""}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
