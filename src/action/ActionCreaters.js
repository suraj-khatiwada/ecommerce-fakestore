import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const fetchData = () => (dispatch) => {
  dispatch(dataLoading());
  axios
    .get("https://fakestoreapi.com/products")
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchAllData(res.data));
      }
    })
    .catch((err) => {
      dispatch(dataFailed(err.response ? err.response.data : "Server Error"));
    });
};

export const dataLoading = () => ({
  type: ActionTypes.PRODUCT_LOADING,
});

export const dataFailed = (errmsg) => ({
  type: ActionTypes.PRODUCT_FAILED,
  payload: errmsg,
});

export const fetchAllData = (data) => {
  return {
    type: ActionTypes.FETCH_ALL_DATA,
    payload: data,
  };
};

export const fetchSpecificCategory = (products) => (dispatch) => {
  console.log("category in action creaters", products);
  dispatch(dataLoading());

  axios
    .get(`https://fakestoreapi.com/products/category/${products}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchAllData(res.data));
      }
    })
    .catch((err) => {
      dispatch(dataFailed(err.response ? err.response.data : "Server Error"));
    });
};

export const fetchSingleProduct = (id) => (dispatch) => {
  console.log("ID", id);
  dispatch(fetchSingleProductRequest());
  axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchSingleProductRequestSuccess(res.data));
      }
    })
    .catch((err) => {
      dispatch(
        fetchSingleProductRequestFailure(
          err.response ? err.response.data : "Server Error"
        )
      );
    });
};

export const fetchSingleProductRequest = () => ({
  type: ActionTypes.FETCH_SINGLE_PRODUCT_REQUEST,
});
export const fetchSingleProductRequestSuccess = (data) => ({
  type: ActionTypes.FETCH_SINGLE_PRODUCT_REQUEST_SUCCESS,
  payload: data,
});
export const fetchSingleProductRequestFailure = (errmsg) => ({
  type: ActionTypes.FETCH_SINGLE_PRODUCT_REQUEST_FAILURE,
  error: errmsg,
});
