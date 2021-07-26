import { OPEN_CART, CLOSE_CART, CartDispatchTypes} from "../actions/cartActionTypes";

  export interface DefaultStateI {
    opened:boolean
  }
  const defaultState: DefaultStateI = {
    opened:false
  };


export const openCartReducer = (state:DefaultStateI = defaultState, action:CartDispatchTypes) => {
    switch(action.type){

        case OPEN_CART:
            return{
                opened:true
            }

        case CLOSE_CART:

        return{
            opened:false
        }

        default:
            return state;
    }
}