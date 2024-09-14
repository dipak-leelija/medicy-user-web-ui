import { actions } from "react-table";
import {
  FETCH_DOCTOR_FAILURE,
  FETCH_DOCTOR_REQUEST,
  FETCH_DOCTOR_SUCCESS,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
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

import { PurchaseItem, StockItemTypes, SellersItemTypes, CustomersItemTypes, DoctorsData } from "../../pages/pharmacy/purchases/data";

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
