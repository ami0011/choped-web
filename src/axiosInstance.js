import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000/'
    // baseURL: "https://phasic-mvp-api.herokuapp.com/",
    baseURL: " https://phasic-mvp-api2.herokuapp.com/"
});

export default axiosInstance