import React from 'react'

import './CartIcon.scss';

import { useDispatch, useSelector } from "react-redux";

import Brightness1Icon from '@material-ui/icons/Brightness1';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { RootStore } from '../../../redux/store';


const CartIcon: React.FC<any> = ({onClick})=> {

    const cartState = useSelector((state: RootStore) => state.cart);
    const { products} = cartState;


    return (
        <div className="cart" onClick={onClick}>
        <div className="cart-icon">
        {products && products.length > 0 &&<Brightness1Icon className="blue-dot"/>}
        <ShoppingCartOutlinedIcon className="shopping-icon"/>
        </div>
        <p className="cart-number">{products && products.length > 0 ? products.length == 1 ? `${products.length} Workshop in cart` : `${products.length} Workshops in cart ` : "Cart is Empty"}</p>
    </div>
    )
}

export default CartIcon
