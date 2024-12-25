import axios from "axios";

export const Productapi = axios.create({
  baseURL: "https://dummyjson.com",

  headers: {
    "Content-Type": "application/json",
  },
});

// const url = 'https://dummyjson.com/products'

function apigetallproducts() {
  return Productapi.get("/products").then((res) => res.data);
};

export const apigetproductbycategory = (category) => {
  return Productapi.get(`/products/category/${category}`).then(
    (res) => res.data
  );
};

export const api = {
  apigetallproducts,

  apigetproductbycategory,
};
