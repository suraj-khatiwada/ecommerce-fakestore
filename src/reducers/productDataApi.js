import * as ActionTypes from "../action/ActionTypes";

const initialState = {
  isLoading: false,
  errmsg: null,
  allData: [],
  singleProduct: [],
  singleProductLoading: false,
  singleProductErr: null,
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_DATA:
      return {
        ...state,
        isLoading: false,
        errmsg: null,
        allData: action.payload,
      };
    case ActionTypes.PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        errmsg: null,
        allData: [],
      };
    case ActionTypes.PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload,
        allData: [],
      };

    case ActionTypes.FETCH_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        singleProductLoading: true,
        singleProductErr: null,
        singleProduct: [],
      };
    case ActionTypes.FETCH_SINGLE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        singleProductLoading: false,
        singleProductErr: null,
        singleProduct: action.payload,
      };
    case ActionTypes.FETCH_SINGLE_PRODUCT_REQUEST_FAILURE:
      return {
        ...state,
        singleProductLoading: false,
        singleProductErr: action.error,
        singleProduct: [],
      };
    default:
      return state;
  }
};
export default productReducer;
