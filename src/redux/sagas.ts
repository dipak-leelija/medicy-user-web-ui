import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import {fetchPatientDetails, fetchDoctorDetails, fetchCustomerDetail, fetchCurrentStockDetail, fetchSalesitem, watchPurchaseItems, fetchDistributor, fetchProductDetails} from "./DataFetch/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), fetchPatientDetails(), fetchDoctorDetails(), fetchCustomerDetail(), fetchCurrentStockDetail(), fetchSalesitem(), watchPurchaseItems(), fetchDistributor(), fetchProductDetails()]);
}
