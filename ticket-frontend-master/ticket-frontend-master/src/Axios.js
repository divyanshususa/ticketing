// api.js
import axios from "axios";

// Create an Axios instance with the base URL
const Axios = axios.create({
  baseURL: "https://legal-427105.el.r.appspot.com",
 // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
