import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const loginperson = (log) => {
    return axiosInstance.post(`/api/login`, log)
};

export const useLogin = (onSuccess, onError) => {
    return useMutation(loginperson, {
        onSuccess,
        onError,
    });
};
