import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const loginperson = (log) => {
    return axiosInstance.post(`https://recostore24.com/login`, log);
};

export const useLogin = (onSuccess, onError) => {
    return useMutation(loginperson, {
        onSuccess,
        onError,
    });
};
