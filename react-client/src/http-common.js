import axios from "axios";

export default axios.create({
  baseURL: "https://react-express-backend.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});