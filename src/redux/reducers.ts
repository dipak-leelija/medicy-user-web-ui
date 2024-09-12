import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import {salesReducer, purchaseReducer, purchaseDistributerReducer} from "./DataFetch/reducer"

export default combineReducers({
  Auth,
  Layout,
  sales: salesReducer,
  purchase: purchaseReducer,
  purchaseDistributer: purchaseDistributerReducer
});
