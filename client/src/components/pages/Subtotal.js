import React,{useContext} from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import {Store} from "../../store";
import {useHistory}  from 'react-router-dom';

// import { useStateValue } from "./StateProvider";
// import { getBasketTotal } from "./reducer";
// import { useHistory } from "react-router-dom";

function Subtotal({shopping,value,handleSubmit}) {
//   const history = useHistory();
//   const [{ basket }, dispatch] = useStateValue();
const {state} = useContext(Store);
const shoppingCart = state.auth.cart;
const history = useHistory();
// const getBasketTotal = (basket) =>{
//     if(basket.length > 0){
//     const priceArray = basket.map(({product_price}) => product_price);
//     const reducer = (accumulator, currentValue) => accumulator+ currentValue;
//    return priceArray.reduce(reducer) 
//     } else {
//       return 0
//     }

// }


const checkout = () =>{
  history.push('/payment');
}
// const paymentCard = () =>{
//   history.push('/payment/card');
// }
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({shoppingCart.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={value} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

{shopping?<button onClick={shoppingCart.length > 0 ? checkout:null}>Proceed to Checkout</button> : <button onClick={handleSubmit}>Proceed to Checkout</button>}
    </div>
  );
}

export default Subtotal;