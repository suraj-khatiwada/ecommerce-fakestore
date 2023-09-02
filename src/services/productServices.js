import axios from "axios";

export const fetchAllProductLists = () => {
  return axios
    .get("https://fakestoreapi.com/products")
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      alert("Error in data fetching", err);
    });
};

export const fetchSelectedProduct = (id) => {
  return axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      alert("Error in data fetching", err);
    });
};

export const fetchSpecificCategory = (category) => {
  return axios
    .get(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      alert("Error in fetching data", err);
    });
};
