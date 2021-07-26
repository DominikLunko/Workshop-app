import React from "react";

import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";

import "./CartItem.scss";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

interface CartType {
  imageUrl: string;
  title: string;
  id: number;
  price: number;
  userId: number;
  qty: number;
  qtyChangeHandler:(id:number,qty:number) =>void;
 removeHandler:(id:number) =>void;
}

const CartItem: React.FC<CartType> = ({ imageUrl, title, price, qty, id,qtyChangeHandler, removeHandler }) => {

  const dispatch = useDispatch()
    const numberOfBuy = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    let decimalPrice
    if(price){
      decimalPrice = price.toFixed(2);
    }
  return (
    <Card className="cart-card">
      <CardImg src={imageUrl} alt="Card image cap" className="cart-img" />
      <CardBody className="card-body-cart">
          <div className="title-bin">
        <CardTitle className="title-card" tag="h5">
          {title}
        </CardTitle>
        <DeleteOutlinedIcon className="bin" onClick={() =>dispatch(removeFromCart(id))}/>
          </div>
          <div className="select-price">
          <select className="cartitem__select" value={qty} onChange={(e) => qtyChangeHandler(id, JSON.parse(e.target.value))}>
                {numberOfBuy.map((number) => (
                    <option key={number} value={number}>{number}</option>
                ))}
            </select>       
        <CardSubtitle tag="h6" className="cartItem-price">
          {decimalPrice}
          <p>EUR</p>
        </CardSubtitle>
          </div>
      </CardBody>
    </Card>
  );
};

export default CartItem;
