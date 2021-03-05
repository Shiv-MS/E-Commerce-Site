import React, { useContext } from "react";
import { Store } from "../../store";
import "./Product.css";
import { Grid } from "@material-ui/core";
import "./Payment.css";
import Subtotal from "./Subtotal";
import returnQtys from "../../utils/getQty";
export default function Payment() {
  const { state } = useContext(Store);
  const user = state.auth.user;
  const shoppingCart = state.auth.cart;
  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.name}</p>
            <p>123 Dev Route</p>
            <p>UCF, FL</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review</h3>
          </div>
          <div className="payment_items">
            <Grid
              container
              justify="center"
              className="paymentContainer"
              spacing={3}
            >
              {shoppingCart.length < 1 ? (
                <p>Add items</p>
              ) : (
                returnQtys(shoppingCart).map((item, i) => (
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    sm={12}
                    md={12}
                    xs={12}
                    style={{ maxWidth: "300px" }}
                    key={item._id + i}
                  >
                    <div className="product">
                      <div className="product_info">
                        <div>{item.product_name}</div>
                        <p className="product_price">
                          <small>$</small>
                          <strong>{item.product_price}</strong>
                        </p>
                      </div>
                      <img src={item.image} alt="" />
                      <div className="quantity">Quantity:{item.qty}</div>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
        <div className="payment_section">
          <div className="subtotal_container">
            <Subtotal />
          </div>
        </div>
      </div>
    </div>
  );
}
