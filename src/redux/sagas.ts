import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import {fetchSalesitem, watchPurchaseItems, fetchDistributor} from "./DataFetch/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), fetchSalesitem(), watchPurchaseItems(), fetchDistributor()]);
}
