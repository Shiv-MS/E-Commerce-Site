import React from 'react'
import "./Product.css";
function Product({product_name,image,product_price,rating}) {
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
                       <p>⭐</p>
                   ))} 
                </div>
            </div>
            <img src={image} alt=""/>
            <button>Add to Basket</button>
        </div>
    )
}

export default Product
