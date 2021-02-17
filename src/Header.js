import React from "react";
import "./Header.css";
function Header() {
  return (
    <div>
      <div className="header">
        <img
          src="https://via.placeholder.com/150C/O https://placeholder.com/"
          alt=""
          className="header_logo"
        />
      </div>
      <div className="header_search">
        <input type="text" className="header_seacrhInput" />
        {/* {logo} */}
      </div>
      <div className="header_nav">
          <div className="header_option"><span className="header_optionLineOne">Hello Guest</span>
          <span className="header_optionLineTwo">Sign In</span></div>
          <div className="header_option">
          <span className="header_optionLineOne">Return</span>
          <span className="header_optionLineTwo">& Orders</span>
          </div>
          <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
          </div>

      </div>
    </div>
  );
}

export default Header;
