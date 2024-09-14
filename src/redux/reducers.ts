import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import {doctorReducer, customerReducer, salesReducer, purchaseReducer, purchaseDistributerReducer} from "./DataFetch/reducer"

export default combineReducers({
  Auth,
  Layout,
  doctors: doctorReducer,
  customer: customerReducer,
  sales: salesReducer,
  purchase: purchaseReducer,
  purchaseDistributer: purchaseDistributerReducer
});
