import React, { useContext, useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { Store } from './store';
import './App.css';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import ShoppingCart from './components/pages/ShoppingCart';
import Header  from './components/pages/Header';
import API from './utils/API';
import Payment from './components/pages/Payment';
import Footer from './components/pages/Footer';
import NoMatch from './components/NoMatch';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const App = () => {
  const { dispatch } = useContext(Store);
  // const [productQuery,setProductQuery] = useState({
  //   search:'',
  //   filtered:[],
  //   loading:true,
  //   notFound:false
  // });
  const [productQuery,setProductQuery] = useState('');
  const [productQueryResults,setProductQueryResults]= useState([]);
  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      setAuthToken(token);

      dispatch(setCurrentUser(decoded));

      if (decoded.exp < currentTime) {
        dispatch(logoutUser());
        window.location.href = './login';
      }
    }
  }, [ dispatch ]);

  const searchProduct = name =>{
    API.getByName(name).then((items)=>{
      setProductQueryResults(items.data);
      console.log(items)
    }).catch((err)=>{
console.log(err.message);
    })
    }
  

  return (
    <Router>
      <div className="App">
        <Header searchProduct={searchProduct} productQuery={productQuery} setProductQuery={setProductQuery}/>
        
        <Switch>
          <PrivateRoute exact path="/shoppingCart" component={ShoppingCart} />
          <Route exact path="/">
          <Home productQueryResults={productQueryResults}/>
          </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/payment"><Elements stripe={stripePromise}>
<Payment></Payment>
</Elements>
</Route>
        <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
        
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
