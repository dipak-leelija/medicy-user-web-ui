// datafetch/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPatientSuccess,
  fetchPatientFailure,
  fetchDoctorSuccess,
  fetchDoctorFailure,
  fetchCustomerSuccess,
  fetchCustomerFailure,
  fetchSalesSuccess,
  fetchSalesFailure,
  fetchPurchaseItemsSuccess,
  fetchPurchaseItemsFailure,
  fetchPurchaseDistributorSuccess,
  fetchPurchaseDistributorFailure,
} from "./actions";
import {Patient, patients, PurchaseItem, purchaseItem, StockItemTypes, stock, SellersItemTypes, sellers, CustomersItemTypes, customers, DoctorsData, doctors } from "../../pages/pharmacy/purchases/data";
import {FETCH_PATIENT_REQUEST, FETCH_PURCHASE_ITEMS_REQUEST, FETCH_PURCHASE_DISTRIBUTER_REQUEST, FETCH_SALES_ITEM_REQUEST, FETCH_CUSTOMER_REQUEST, FETCH_DOCTOR_REQUEST } from "../../constants/dataFetch";

// Type for the API call
type patientApiResponse = Patient[];
type doctorApiResponse = DoctorsData[];
type customerApiResponse = CustomersItemTypes[];
type saleApiResponse = SellersItemTypes[];
type purChaseAPIResponse = PurchaseItem[];
type PurchaseDistributorResponse = StockItemTypes[];

//API call to fetch patient 
function* fetchPatient(): Generator<any, void, patientApiResponse> {
  try {
    const data: patientApiResponse = yield call(()=>
    new Promise<patientApiResponse>((res)=> res(patients))
  );
  yield put(fetchPatientSuccess(data));
}catch(error){
  yield put(fetchPatientFailure(error))
}
}
export function* fetchPatientDetails(){
  yield takeLatest(FETCH_PATIENT_REQUEST, fetchPatient);
}

//API call to fetch doctors
function* fetchDoctor(): Generator<any, void, doctorApiResponse> {
  try {
    const data: doctorApiResponse = yield call(()=>
      new Promise<doctorApiResponse>((res) => res(doctors))
    );
    // console.log('Doctor data fetched:', data);
    yield put(fetchDoctorSuccess(data));
}catch(error){
  yield put(fetchDoctorFailure('Fail to fetch doctors'));
}
}
export function* fetchDoctorDetails(){
  yield takeLatest(FETCH_DOCTOR_REQUEST, fetchDoctor);
}

// API call to fetch customers
function* fetchCustomer(): Generator<any, void, customerApiResponse> {
  try{
    const data: customerApiResponse = yield call(() =>
      new Promise<customerApiResponse>((res) => res(customers))
    );
    yield put(fetchCustomerSuccess(data));
  }catch(error){
    yield put(fetchCustomerFailure('Fail to fetch customer'));
  }
} 
export function* fetchCustomerDetail(){
  yield takeLatest(FETCH_CUSTOMER_REQUEST, fetchCustomer);
}
// API call fetch sales data 
function* fetchSales(): Generator<any, void, saleApiResponse> {
  try {
    const data: saleApiResponse = yield call(() =>
      new Promise<saleApiResponse>((res) => res(sellers))
    );
    yield put(fetchSalesSuccess(data));
  } catch (error) {
    yield put(fetchSalesFailure('Failed to fetch sales item'));
  }
}

export function* fetchSalesitem(){
  yield takeLatest(FETCH_SALES_ITEM_REQUEST, fetchSales);
}
// API call fetch purchase data 
function* fetchPurchaseItems(): Generator<any, void, purChaseAPIResponse> {
  try {
    // Simulate an API call
    const data: purChaseAPIResponse = yield call(() =>
      new Promise<purChaseAPIResponse>((res) => res(purchaseItem))
    );
    yield put(fetchPurchaseItemsSuccess(data));
  } catch (error) {
    yield put(fetchPurchaseItemsFailure("Failed to fetch purchase items"));
  }
}

export function* watchPurchaseItems() {
  yield takeLatest(FETCH_PURCHASE_ITEMS_REQUEST, fetchPurchaseItems);
}

// API call fetch purchase distributor 
function* fetchPurchaseDistributor(): Generator<any, void, PurchaseDistributorResponse> {
  try {
    const data: PurchaseDistributorResponse = yield call(() =>
      new Promise<PurchaseDistributorResponse>((res) => res(stock))
    );
    yield put(fetchPurchaseDistributorSuccess(data));
  } catch (error) {
    yield put(fetchPurchaseDistributorFailure("Failed to fetch purchase distributor"));
  }
}

export function* fetchDistributor() {
  yield takeLatest(FETCH_PURCHASE_DISTRIBUTER_REQUEST, fetchPurchaseDistributor);
}