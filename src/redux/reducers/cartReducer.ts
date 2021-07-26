import { CartDispatchTypes, ADD_TO_CART, REMOVE_FROM_CART, Cart, RESET_CART} from "../actions/cartActionTypes";

  export interface DefaultStateI {
    products: Cart[];
  }
  const defaultState: DefaultStateI = {
    products: [],
  };


export const cartReducer = (state:DefaultStateI = defaultState, action:CartDispatchTypes) => {
    switch(action.type){

        case RESET_CART:
            return {
                products:[]
            }
       
        case ADD_TO_CART:
            const item = {
                ...action.payload
            }

            const existItem = state.products.find((x) => x.id === item.id);
            
           
            if(existItem){
                if(item.singleAdd === false){
                    item.qty = existItem.qty + 1
                }
                return {
                    ...state,
                    products: state.products.map((x) => x.id == existItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    products: [...state.products, item],
                };
            }
        
        case REMOVE_FROM_CART:
            return {
                ...state,
                products: state.products.filter((x) => x.id !== action.payload)
            }

        default:
            return state;
    }
}