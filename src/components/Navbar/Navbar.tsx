import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

import { useDispatch } from "react-redux";

import CartIcon from './CartIcon/CartIcon';
import { RootStore } from "../../redux/store";
import { openCart } from "../../redux/actions/cartActions";



const Navbar: React.FC<any> = () => {

  const dispatch = useDispatch();
  


  return (
    <div className="nav">
    <div className="navbar">
      <div className="navbar__logo">
          <Link className="logo-link" to="/" >
            <p className="tinel-text">tinel</p>
            <p className="workshop-text">Workshop</p>
          </Link>
      </div>
      <div className="cart_div">
      <CartIcon onClick={() => dispatch(openCart())}/>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
