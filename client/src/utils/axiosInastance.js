import Axios from "axios";

const axiosInstance = Axios.create({
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);
axiosInstance.defaults.baseURL = process.env.NODE_ENV === "development" ? "/" : "/api";

export default axiosInstance;
