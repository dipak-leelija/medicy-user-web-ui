import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import {purchaseReducer, purchaseDistributerReducer} from "./DataFetch/reducer"

export default combineReducers({
  Auth,
  Layout,
  purchase: purchaseReducer,
  purchaseDistributer: purchaseDistributerReducer
});
