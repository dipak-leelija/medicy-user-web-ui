
import {
    FETCH_PATIENT_REQUEST,
    FETCH_PATIENT_SUCCESS,
    FETCH_PATIENT_FAILURE,
    FETCH_DOCTOR_REQUEST,
    FETCH_DOCTOR_SUCCESS,
    FETCH_DOCTOR_FAILURE,
    FETCH_CUSTOMER_REQUEST,
    FETCH_CUSTOMER_SUCCESS,
    FETCH_CUSTOMER_FAILURE,
    // ...........saleItem or saller........
    FETCH_SALES_ITEM_REQUEST,
    FETCH_SALES_ITEM_SUCCESS,
    FETCH_SALES_ITEM_FAILURE,
    // ...........currentStock............ 
    FETCH_CURRENT_STOCKS_REQUEST,
    FETCH_CURRENT_STOCKS_SUCCESS,
    FETCH_CURRENT_STOCKS_FAILURE,
    //...........purchaseItem.............
    FETCH_PURCHASE_ITEMS_REQUEST,
    FETCH_PURCHASE_ITEMS_SUCCESS,
    FETCH_PURCHASE_ITEMS_FAILURE,
    // ...........purchaseDistributo............
    FETCH_PURCHASE_DISTRIBUTER_REQUEST,
    FETCH_PURCHASE_DISTRIBUTER_SUCCESS,
    FETCH_PURCHASE_DISTRIBUTER_FAILURE,
    // ...........product............
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
} from "../../constants/dataFetch";

// SellersItemTypes
import { PurchaseItem, StockItemTypes, SellersItemTypes, CustomersItemTypes, DoctorsData, Patient, CurrentStockTypes, ProductItemTypes } from "../../pages/pharmacy/data";

// for  patient 
export const fetchPatientRequest = () => {
    return {
        type: FETCH_PATIENT_REQUEST
    }
}
export const fetchPatientSuccess = (data: Patient[]) => {
    return {
        type: FETCH_PATIENT_SUCCESS,
        payload: data
    }
}
export const fetchPatientFailure = (error: any) => {
    return {
        type: FETCH_PATIENT_FAILURE,
        payload: error
    }
}

// for doctor 
export const fetchDoctorRequest = () => {
    return {
        type: FETCH_DOCTOR_REQUEST
    }
}
export const fetchDoctorSuccess = (data: DoctorsData[]) => {
    return {
        type: FETCH_DOCTOR_SUCCESS,
        payload: data
    }
}
export const fetchDoctorFailure = (error: string) => {
    return {
        type: FETCH_DOCTOR_FAILURE,
        payload: error
    }
}
// for customer 
export const fetchCustomerRequest = () => {
    return {
        type: FETCH_CUSTOMER_REQUEST
    }
}
export const fetchCustomerSuccess = (data: CustomersItemTypes[]) => {
    return {
        type: FETCH_CUSTOMER_SUCCESS,
        payload: data
    }
}
export const fetchCustomerFailure = (error: string) => {
    return {
        type: FETCH_CUSTOMER_FAILURE,
        payload: error
    }
}

// for current stock
export const fetchCurrentStockRequest = () => {
    return {
        type: FETCH_CURRENT_STOCKS_REQUEST,
    }
}
export const fetchCurrentStockSuccess = (data: CurrentStockTypes[]) => {
    return {
        type: FETCH_CURRENT_STOCKS_SUCCESS,
        payload: data
    }
}
export const fetchCurrentStockFailure = (error: string) => {
    return {
        type: FETCH_CURRENT_STOCKS_FAILURE,
        payload: error
    }
} //..................

// for sales 
export const fetchSalesRequest = () => {
    return {
        type: FETCH_SALES_ITEM_REQUEST,
    }
}
export const fetchSalesSuccess = (data: SellersItemTypes[]) => {
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

// for product
export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST,
});
export const fetchProductSuccess = (data: ProductItemTypes[]) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
});
export const fetchProductFailure = (error: string) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
});
