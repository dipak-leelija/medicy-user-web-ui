import {
    FETCH_PURCHASE_ITEMS_REQUEST,
    FETCH_PURCHASE_ITEMS_SUCCESS,
    FETCH_PURCHASE_ITEMS_FAILURE,
    FETCH_PURCHASE_DISTRIBUTER_REQUEST,
    FETCH_PURCHASE_DISTRIBUTER_SUCCESS,
    FETCH_PURCHASE_DISTRIBUTER_FAILURE,
  } from "../../constants/dataFetch";

  import { PurchaseItem, StockItemTypes } from "../../pages/pharmacy/purchases/data";

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

  export const purchaseDistributerReducer = (state = initialStateDistributor, action:any) =>{
    switch (action.type) {
        case FETCH_PURCHASE_DISTRIBUTER_REQUEST:
            return {...state, loading: true};
        case FETCH_PURCHASE_DISTRIBUTER_SUCCESS:
            return {...state, loading: false, data: action.payload};
        case FETCH_PURCHASE_DISTRIBUTER_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
  }
};
