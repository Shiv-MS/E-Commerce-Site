import React ,{useContext}from "react";
import { Store } from '../../store';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from 'react-router-dom';

function Header() {
  const {state}= useContext(Store)
  const user = state.auth.user;
  return (
    <div className="header">
      <Link to='/'>
      <img
        src="https://via.placeholder.com/150C/O https://placeholder.com/" alt="" className="header_logo"/>
        </Link>
      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className='header_searchIcon'/>
        {/* {logo} */}
      </div>
      <div className="header_nav">
        <Link to="/login">
        <div className="header_option">
          <span className="header_optionLineOne">Hello {user.name? `${user.name}`: 'Guest'}</span>
          <span className="header_optionLineTwo">{user.name ? 'Shopping Cart': 'Sign In'}</span>
        </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Return</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
        <div className="header_optionBasket"><ShoppingBasketIcon/>
        <span className="header_optionLineTwo header_basketCount">0</span></div>
      </div>
    </div>
  );
}

export default Header;
