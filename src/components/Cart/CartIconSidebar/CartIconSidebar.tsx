import React from 'react'
import './CartIconSidebar.scss'

import Brightness1Icon from '@material-ui/icons/Brightness1';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

interface MyProps{
    numOfItems:number
}


const CartIconSidebar:React.FC<MyProps> = ({numOfItems}) => {

    return (
        <div className="cart">
        <div className="cart-icon">
        {numOfItems > 0 &&<Brightness1Icon className="blue-dot-sidebar"/>}
        <ShoppingCartOutlinedIcon className="shopping-icon"/>
        </div>
        <p className="cart-number-sidebar">{numOfItems > 0 ? numOfItems == 1 ? `${numOfItems} Workshop` : `${numOfItems} Workshops ` : "Cart is Empty"}</p>
    </div>
    )
}

export default CartIconSidebar
