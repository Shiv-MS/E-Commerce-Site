import React, { useContext ,useEffect,useState} from 'react';
import { Store } from '../../store';
import Product from "./Product";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API.js";
import "./Home.css";
import CircularProgress from '@material-ui/core/CircularProgress';

// import { Link } from 'react-router-dom';

const Home = props => {
  // const { state } = useContext(Store);
 const [pending,setPending] = useState(false);
  // let productSeed = [
  //   {
  //     product_name:'Miss',
  //     product_price:10,
  //     product_description:'',
  
  //   },
  //   {
  //     product_name:'Tiara',
  //     product_price:12,
  //     product_description:'',
  
  //   },
  //   {
  //     product_name:'Reloj Pastel',
  //     product_price:5,
  //     product_description:'',
  
  //   },{
  //     product_name:'Emperatriz',
  //     product_price:10,
  //     product_description:'',
  
  //   }
  // ];
  
  // console.log({ state, props });
  const [products,setProducts] = useState([]);
  useEffect(()=>{
  setPending(true);
  API.get_product().then((product)=>{
  // setProducts([...product.data]);
  const data = [...product.data]
  // console.log(data);
  setProducts(data);
  setPending(false)
  }).catch(({message})=>{
    console.log(message);
  })
  },[])

  return (
    <div className="home">
    <div className="home_container">
      <Grid container spacing={3} justify="center" className="home_row"> {
        (pending? <CircularProgress color="secondary" />:(props.productQueryResults.length <= 0 ? products: props.productQueryResults).map(({product_name,product_price,_id,image}) =>(
        <Grid item xl={3} lg={3} sm={5} md={5} xs={12} key={_id}  >
        
          <Product product_name={product_name} product_price={product_price} product_description _id={_id} image={image}></Product>
  
        </Grid>
        )))}
      </Grid>
        
    </div>
  </div>
  );
};

export default Home;

