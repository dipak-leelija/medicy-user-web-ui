import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import {patientReducer, doctorReducer, customerReducer, currentStockReducer, salesReducer, purchaseReducer, purchaseDistributerReducer, productReducer} from "./DataFetch/reducer"

export default combineReducers({
  Auth,
  Layout,
  patient: patientReducer,
  doctors: doctorReducer,
  customer: customerReducer,
  currentStock: currentStockReducer,
  sales: salesReducer,
  purchase: purchaseReducer,
  purchaseDistributer: purchaseDistributerReducer,
  product: productReducer,
});
