// datafetch/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
//   fetchPurchaseItemsRequest,
  fetchPurchaseItemsSuccess,
  fetchPurchaseItemsFailure,
  fetchPurchaseDistributorSuccess,
  fetchPurchaseDistributorFailure,
} from "./actions";
import { PurchaseItem, purchaseItem, StockItemTypes, stock} from "../../pages/pharmacy/purchases/data";
import { FETCH_PURCHASE_ITEMS_REQUEST, FETCH_PURCHASE_DISTRIBUTER_REQUEST } from "../../constants/dataFetch";

// Type for the API call
type purChaseAPIResponse = PurchaseItem[];
type PurchaseDistributorResponse = StockItemTypes[];

function* fetchPurchaseItems(): Generator<any, void,purChaseAPIResponse> {
  try {
    // Simulate an API call
    const data:purChaseAPIResponse = yield call(() => 
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

function* fetchPurchaseDistributor(): Generator<any, void, PurchaseDistributorResponse> {
    try{
        const data:PurchaseDistributorResponse = yield call(() =>
            new Promise<PurchaseDistributorResponse>((res) => res(stock))
        );
        yield put(fetchPurchaseDistributorSuccess(data));
    }catch(error) {
        yield put(fetchPurchaseDistributorFailure("Failed to fetch purchase distributor"));
    }
}

export function* fetchDistributor() {
    yield takeLatest(FETCH_PURCHASE_DISTRIBUTER_REQUEST, fetchPurchaseDistributor);
}