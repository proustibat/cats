import axios from "axios";

const API_KEY = process.env.CAT_API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1";

if (!API_KEY) {
  throw "You need an API KEY!";
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.method = "GET";

export const fetchBreeds = () => {
  return axios.get("/breeds?limit=10&page=0");
};
