import Axios from "axios";

const axiosInstance = Axios.create({
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
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
axiosInstance.defaults.baseURL = process.env.NODE_ENV === "development" ? "/" : "https://recostore24.com/";

export default axiosInstance;
