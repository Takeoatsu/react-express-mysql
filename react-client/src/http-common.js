import axios from "axios";

export default axios.create({
  baseURL: "http://4.248.249.243/api", // Replace with your actual base URL
  headers: {
    "Content-type": "application/json"
  }
});