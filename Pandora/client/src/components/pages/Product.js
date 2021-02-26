import React, {useState} from 'react';
import "./Product.css";
import API from '../../utils/API';

function Product({product_name,image,product_price,rating,_id}) {
    const addToCart = (item)=>{
         API.add_to_cart(item)
        .then((res)=>{
            console.log(res)
        })
    }
    return (
        <div className='product'>
            <div className="product_info">
    <p>{product_name}</p>
                <p className="product_price">
                    <small>$</small>
    <strong>{product_price}</strong>
                </p>
                <div className="product_rating">
                   {Array(rating).fill().map((_,i)=>(
                       <p key={i}>⭐</p>
                   ))} 
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={()=>{addToCart(_id)}}>Add to Basket</button>
        </div>
    )
}

export default Product
