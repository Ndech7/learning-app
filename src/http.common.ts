import axios from "axios";

export default axios.create({
  baseURL: "http://learning-app.onrender.com/api/hubs",
  headers: {
    "Content-Type": "application/json",
  },
});
