import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import {fetchDoctorDetails, fetchCustomerDetail, fetchSalesitem, watchPurchaseItems, fetchDistributor} from "./DataFetch/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), fetchDoctorDetails(), fetchCustomerDetail(), fetchSalesitem(), watchPurchaseItems(), fetchDistributor()]);
}
