export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CHANGE_QTY = "CHANGE_QTY"
export const OPEN_CART = "OPEN_CART"
export const CLOSE_CART = "CLOSE_CART"
export const RESET_CART = "RESET_CART"


export type Cart = {
    id: number,
    title: string,
    desc:string,
    price: number,
    date: string,
    category: string,
    userId: number,
    imageUrl: string,
    qty:number
    singleAdd:boolean,
    
}

export interface OpenCart {
    type: typeof OPEN_CART,
}
export interface CloseCart {
    type: typeof CLOSE_CART,
}

export interface ResetCart {
    type: typeof RESET_CART,
}

export interface AddToCart {
    type: typeof ADD_TO_CART,
    payload: Cart
}



export interface RemoveFromCart {
    type: typeof REMOVE_FROM_CART,
    payload:number
    
}





 export type CartDispatchTypes = AddToCart | RemoveFromCart | OpenCart | CloseCart | ResetCart