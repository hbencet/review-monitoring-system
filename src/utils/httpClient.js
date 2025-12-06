const axios = require("axios");

module.exports = axios.create({
  baseURL: process.env.PYTHON_API_URL || "http://localhost:8001",
  timeout: 5000
});
