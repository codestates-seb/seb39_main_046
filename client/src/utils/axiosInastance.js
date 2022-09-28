import Axios from "axios";

const axiosInstance = Axios.create({
  // baseURL: "http://ec2-3-34-98-9.ap-northeast-2.compute.amazonaws.com:8080", // 서버 url
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default axiosInstance;
