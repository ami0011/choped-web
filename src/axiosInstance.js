import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000/'
  baseURL: "https://choped-api.herokuapp.com/"
});

export default axiosInstance