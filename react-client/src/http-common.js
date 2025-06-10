import axios from "axios";

export default axios.create({
  baseURL: "https://reactstaticwebapp.z9.web.core.windows.net/api",
  headers: {
    "Content-type": "application/json"
  }
});