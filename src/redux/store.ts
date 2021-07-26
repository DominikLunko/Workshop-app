import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const cartFromLocalStorage = localStorage.getItem("cart");

const INITIAL_STATE = {
  cart: {
    products: cartFromLocalStorage && JSON.parse(cartFromLocalStorage),
  },
};

const store = createStore(
  RootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducer>;

export default store;
