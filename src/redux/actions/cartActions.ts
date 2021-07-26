import { Dispatch } from "react";
import { ADD_TO_CART, CartDispatchTypes, REMOVE_FROM_CART, CLOSE_CART, OPEN_CART, RESET_CART } from "./cartActionTypes";
import * as API from "../../api";

export const addToCart = (id:number, qty:number, singleAdd:boolean) => async (dispatch: Dispatch<CartDispatchTypes>, getState:any) =>{
    const {data} = await API.addToCartURL(id);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            ...data[0],
            qty,
            singleAdd:singleAdd
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.products));
};

export const removeFromCart = (id:number) => (dispatch: Dispatch<CartDispatchTypes>, getState:any) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.products))
};

export const resetCart = () => (dispatch: Dispatch<CartDispatchTypes>) => {
    dispatch({
        type: RESET_CART,
    })

    localStorage.clear()
};

export const openCart = () => (dispatch: Dispatch<CartDispatchTypes>) => {
    dispatch({
        type: OPEN_CART,
    })

};

export const closeCart = () => (dispatch: Dispatch<CartDispatchTypes>) => {
    dispatch({
        type: CLOSE_CART,
    })

};

