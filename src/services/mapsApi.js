import axios from "axios";

const mapsApi = axios.create({
  baseURL: process.env.REACT_APP_MAPS_API_URL
});

export default mapsApi;
