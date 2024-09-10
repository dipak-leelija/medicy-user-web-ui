import {
    FETCH_PURCHASE_ITEMS_REQUEST,
    FETCH_PURCHASE_ITEMS_SUCCESS,
    FETCH_PURCHASE_ITEMS_FAILURE,
    FETCH_PURCHASE_DISTRIBUTER_REQUEST,
    FETCH_PURCHASE_DISTRIBUTER_SUCCESS,
    FETCH_PURCHASE_DISTRIBUTER_FAILURE,
} from "../../constants/dataFetch";

import { PurchaseItem, StockItemTypes } from "../../pages/pharmacy/purchases/data";


// for purchase distributor 

export const fetchPurchaseDistributorRequest = () => {
    return {
        type: FETCH_PURCHASE_DISTRIBUTER_REQUEST
    }
}
export const fetchPurchaseDistributorSuccess = (data: StockItemTypes[]) => {
    return {
        type: FETCH_PURCHASE_DISTRIBUTER_SUCCESS,
        payload: data,
    }
}
export const fetchPurchaseDistributorFailure = (error: string) => {
    return {
        type: FETCH_PURCHASE_DISTRIBUTER_FAILURE,
        error: error,
    }
}

// for purchase item 
export const fetchPurchaseItemsRequest = () => ({
    type: FETCH_PURCHASE_ITEMS_REQUEST,
});

export const fetchPurchaseItemsSuccess = (data: PurchaseItem[]) => ({
    type: FETCH_PURCHASE_ITEMS_SUCCESS,
    payload: data,
});

export const fetchPurchaseItemsFailure = (error: string) => ({
    type: FETCH_PURCHASE_ITEMS_FAILURE,
    payload: error,
});

