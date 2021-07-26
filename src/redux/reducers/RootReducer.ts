import { combineReducers } from "redux";
import workshopReducer from "./workshopReducers";
import workshopDetailsReducer from "./workshopDetailsReducer";
import { cartReducer } from "./cartReducer";
import { openCartReducer } from "./openCartReducer";

const RootReducer = combineReducers({
    workshop: workshopReducer,
    workshopDetails: workshopDetailsReducer,
    cart:cartReducer,
    openCart:openCartReducer
});

export default RootReducer;