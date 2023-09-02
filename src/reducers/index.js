import { combineReducers } from "redux";
import productReducer from "./productDataApi";

const rootReducer = combineReducers({
  productReducer: productReducer,
});
export default rootReducer;
