import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import {fetchPatientDetails, fetchDoctorDetails, fetchCustomerDetail, fetchSalesitem, watchPurchaseItems, fetchDistributor} from "./DataFetch/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), fetchPatientDetails(), fetchDoctorDetails(), fetchCustomerDetail(), fetchSalesitem(), watchPurchaseItems(), fetchDistributor()]);
}
