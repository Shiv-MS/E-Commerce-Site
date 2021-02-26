import React, { useContext ,useEffect,useState} from 'react';
import { Store } from '../../store';
import Product from "./Product";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API.js";
import "./Home.css"
// import { Link } from 'react-router-dom';

const Home = props => {
  const { state } = useContext(Store);

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
  
  console.log({ state, props });
  const [products,setProducts] = useState([]);
  useEffect(()=>{
  
  API.get_product().then((product)=>{
  // setProducts([...product.data]);
  const data = [...product.data]
  console.log(data);
  setProducts(data)
  }).catch(({message})=>{
    console.log(message);
  })
  },[])

  return (
    <div className="home">
    <div className="home_container">
      <img
        className="home_image"
        src="https://via.placeholder.com/1500x600.png?C/Ohttps://placeholder.com/"
        alt=""
      />

      <Grid container spacing={3} justify="center" className='home_row'> {
        (products||productSeed).map(({product_name,product_price,_id}) =>(
        <Grid item xl={3} lg={3} sm={5} md={5} xs={12} key={_id}  >
        
          <Product product_name={product_name} product_price={product_price} product_description _id={_id}></Product>
        
        </Grid>
        ))}
      </Grid>
        
    </div>
  </div>
  );
};

export default Home;