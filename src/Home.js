import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://via.placeholder.com/1500x600.png?C/Ohttps://placeholder.com/"
          alt=""
        />
      
      <div className="home_row">
        <Product title='The Lean Startup' price={29.99} image="https://via.placeholder.com/150C/O https://placeholder.com/" rating={5}/>
        <Product />
      </div>
      <div className="home_row">
      <Product />
      <Product />
      <Product />
      </div>
      <div className="home_row">
      <Product />
      </div>
      </div>
    </div>
  );
}

export default Home;
