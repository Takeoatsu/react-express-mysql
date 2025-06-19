import axios from "axios";

export default axios.create({
  baseURL: "20.48.173.221/api", // Replace with your actual base URL
  headers: {
    "Content-type": "application/json"
  }
});