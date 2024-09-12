// datafetch/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSalesSuccess,
  fetchSalesFailure,
  //   fetchPurchaseItemsRequest,
  fetchPurchaseItemsSuccess,
  fetchPurchaseItemsFailure,
  fetchPurchaseDistributorSuccess,
  fetchPurchaseDistributorFailure,
} from "./actions";
import { PurchaseItem, purchaseItem, StockItemTypes, stock, SellersItemTypes, sellers } from "../../pages/pharmacy/purchases/data";
import { FETCH_PURCHASE_ITEMS_REQUEST, FETCH_PURCHASE_DISTRIBUTER_REQUEST, FETCH_SALES_ITEM_REQUEST } from "../../constants/dataFetch";

// Type for the API call
type saleApiResponse = SellersItemTypes[];
type purChaseAPIResponse = PurchaseItem[];
type PurchaseDistributorResponse = StockItemTypes[];

// fetch sales data 
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
// fetch purchase data 
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

// fetch purchase distributor 
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