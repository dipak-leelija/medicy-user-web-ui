import { error } from "console";
import {
    FETCH_SALES_ITEM_REQUEST,
    FETCH_SALES_ITEM_SUCCESS,
    FETCH_SALES_ITEM_FAILURE,
    FETCH_PURCHASE_ITEMS_REQUEST,
    FETCH_PURCHASE_ITEMS_SUCCESS,
    FETCH_PURCHASE_ITEMS_FAILURE,
    FETCH_PURCHASE_DISTRIBUTER_REQUEST,
    FETCH_PURCHASE_DISTRIBUTER_SUCCESS,
    FETCH_PURCHASE_DISTRIBUTER_FAILURE,
} from "../../constants/dataFetch";

// SellersItemTypes
import { PurchaseItem, StockItemTypes, SellersItemTypes } from "../../pages/pharmacy/purchases/data";

// for sales 
export const fetchSalesRequest = () => {
    return {
        type: FETCH_SALES_ITEM_REQUEST,
    }
}
export const fetchSalesSuccess = (data: SellersItemTypes[]) =>{
    return {
        type: FETCH_SALES_ITEM_SUCCESS,
        payload: data
        }
}
export const fetchSalesFailure = (error: string) => {
    return {
        type: FETCH_SALES_ITEM_FAILURE,
        payload: error
        }
}

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

