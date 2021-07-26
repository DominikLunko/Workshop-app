import React, { useState } from "react";
import "./Cart.scss";


import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import CloseIcon from "@material-ui/icons/Close";
import CartIconSidebar from "./CartIconSidebar/CartIconSidebar";
import { RootStore } from "../../redux/store";
import CartItem from "./CartItem/CartItem";
import { addToCart, closeCart, removeFromCart } from "../../redux/actions/cartActions";

const Cart: React.FC<any> = ({setShowCheckout }) => {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootStore) => state.cart);
  const { products} = cartState;

  const { opened } = useSelector(
    (state: RootStore) => state.openCart
  );

  const qtyChangeHandler = (id:number, qty:number) => {
    dispatch(addToCart(id, qty,true));
  };

  const removeHandler = (id:number) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return products.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return products.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
      <div className={opened ? "sidebar active" : "sidebar"}>
        <div className="title-and-close">
          <CartIconSidebar numOfItems={products && products.length}/>
          <CloseIcon className="close-sidebar" style={{ cursor: "pointer" }} onClick={() =>dispatch(closeCart())} />
        </div>
        <Container className="cart-items-container">
          <Row className="row-cart" xl="1" lg="1" md="1" xs="1">
            {products &&
              products.map((product,idx) => (
                <Col  key={idx}>
                  <CartItem
                    key={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    id={product.id}
                    price={product.price}
                    userId={product.userId}
                    qty={product.qty}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeHandler}
                  />
                </Col>
              ))}
          </Row>
        </Container>
        {products && products.length > 0 &&
        <div className="subtotal-wrap">
                <p>SUBTOTAL ({getCartCount()})ITEMS</p>
                <h2>{getCartSubTotal().toFixed(2)} EUR</h2>
                <button onClick={() => setShowCheckout(true)}>Checkout</button>
        </div>
        }
      </div>
  );
};

export default Cart;
