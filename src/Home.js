import React from "react";
import "./Home.css";
import Product from "./Product";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
let productSeed = [
  {
    product_name:'Miss',
    product_price:10,
    product_description:'',

  },
  {
    product_name:'Tiara',
    product_price:12,
    product_description:'',

  },
  {
    product_name:'Reloj Pastel',
    product_price:5,
    product_description:'',

  },{
    product_name:'Emperatriz',
    product_price:10,
    product_description:'',

  }
];
 
function Home() {
  
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://via.placeholder.com/1500x600.png?C/Ohttps://placeholder.com/"
          alt=""
        />

        <Grid container spacing={3} justify="center"> {
          productSeed.map(({product_name,product_price,product_description}) =>(
          <Grid item xl={3} lg={3} sm={5} md={5} xs={12} spacing={1}>
            <Product product_name={product_name} product_price={product_price} product_description></Product>
          </Grid>
          ))}
        </Grid>
          )
        {/* <div className="home_row">
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
      </div> */}
      </div>
    </div>
  );
}

export default Home;
