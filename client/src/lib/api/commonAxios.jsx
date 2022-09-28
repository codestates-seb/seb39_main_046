import axios from "axios";
// import useStore from "../store";

// const {logInfo} = useStore();

const commonAxios = axios.create({
  timeout: 5000,
  headers:{
    "Content-Type": "application/json",
  },
});

commonAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default commonAxios;