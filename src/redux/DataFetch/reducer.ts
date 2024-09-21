import { actions } from "react-table";
import {
  FETCH_PATIENT_FAILURE,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_DOCTOR_FAILURE,
  FETCH_DOCTOR_REQUEST,
  FETCH_DOCTOR_SUCCESS,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  // ...........currentStock............ 
  FETCH_CURRENT_STOCKS_REQUEST,
  FETCH_CURRENT_STOCKS_SUCCESS,
  FETCH_CURRENT_STOCKS_FAILURE,
  FETCH_SALES_ITEM_REQUEST,
  FETCH_SALES_ITEM_SUCCESS,
  FETCH_SALES_ITEM_FAILURE,
  FETCH_PURCHASE_ITEMS_REQUEST,
  FETCH_PURCHASE_ITEMS_SUCCESS,
  FETCH_PURCHASE_ITEMS_FAILURE,
  FETCH_PURCHASE_DISTRIBUTER_REQUEST,
  FETCH_PURCHASE_DISTRIBUTER_SUCCESS,
  FETCH_PURCHASE_DISTRIBUTER_FAILURE,
  // ...........product............
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "../../constants/dataFetch";

import { PurchaseItem, StockItemTypes, SellersItemTypes, CustomersItemTypes, DoctorsData, Patient, CurrentStockTypes, ProductItemTypes } from "../../pages/pharmacy/data";


interface patientState {
  loading: boolean;
  data: Patient[];
  error: string | null;
}
interface DoctorState {
  loading: boolean;
  data: DoctorsData[];
  error: string | null;
}
interface CustomeState {
  loading: boolean;
  data: CustomersItemTypes[];
  error: string | null;
}
interface CurrentStockState {
  loading: boolean;
  data: CurrentStockTypes[];
  error: string | null;

}
interface SaleState {
  loading: boolean;
  data: SellersItemTypes[];
  error: string | null;
}
interface PurchaseState {
  loading: boolean;
  data: PurchaseItem[];
  error: string | null;
}
interface PurchaseDistributorState {
  loading: boolean;
  data: StockItemTypes[];
  error: string | null;
}

interface productState {
  loading: false;
  data: ProductItemTypes[];
  error:null;
}
const initialPatientState: patientState = {
  loading: false,
  data: [],
  error: null
}
const initialDoctorState: DoctorState = {
  loading: false,
  data: [],
  error: null,
}
const initialCustomerState: CustomeState = {
  loading: false,
  data: [],
  error: null,
}
const initialCurrentStock: CurrentStockState = {
  loading: false,
  data: [],
  error: null
}
const initialSaleState: SaleState = {
  loading: false,
  data: [],
  error: null
}
const initialState: PurchaseState = {
  loading: false,
  data: [],
  error: null,
};
const initialStateDistributor: PurchaseDistributorState = {
  loading: false,
  data: [],
  error: null,
}
const initialStateProduct: productState ={
  loading: false,
  data: [],
  error: null
}

export const patientReducer = (state = initialPatientState, action: any) => {
  switch (action.type) {
    case FETCH_PATIENT_REQUEST:
      return { ...state, loading: true }
    case FETCH_PATIENT_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_PATIENT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}

export const doctorReducer = (state = initialDoctorState, action: any) => {
  switch (action.type) {
    case FETCH_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case FETCH_DOCTOR_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DOCTOR_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export const customerReducer = (state = initialCustomerState, action: any) => {
  switch (action.type) {
    case FETCH_CUSTOMER_REQUEST:
      return { ...state, loading: true };
    case FETCH_CUSTOMER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CUSTOMER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export const currentStockReducer = (state = initialCurrentStock, action: any) => {
  switch (action.type) {
    case FETCH_CURRENT_STOCKS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CURRENT_STOCKS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CURRENT_STOCKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export const salesReducer = (state = initialSaleState, action: any) => {
  switch (action.type) {
    case FETCH_SALES_ITEM_REQUEST:
      return { ...state, loading: true };
    case FETCH_SALES_ITEM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_SALES_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const purchaseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PURCHASE_ITEMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PURCHASE_ITEMS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_PURCHASE_ITEMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const purchaseDistributerReducer = (state = initialStateDistributor, action: any) => {
  switch (action.type) {
    case FETCH_PURCHASE_DISTRIBUTER_REQUEST:
      return { ...state, loading: true };
    case FETCH_PURCHASE_DISTRIBUTER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_PURCHASE_DISTRIBUTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReducer = (state = initialStateProduct, action: any) =>{
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {...state, loading: true}
    case FETCH_PRODUCT_SUCCESS:
      return {...state, loading: false, data: action.payload}
    case  FETCH_PRODUCT_FAILURE:
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }
}
