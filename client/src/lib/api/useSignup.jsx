import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const addPerson = (person) => {
    return axiosInstance.post("/member/signup", person);
};

export const useSignup = (onSuccess, onError) => {
    return useMutation(addPerson, {
        onSuccess,
        onError,
    });
};

const addAdmin = (SendData) => {
    return axiosInstance.post(`/member/signup/admin?inputPassword=${SendData.adminpw}`, SendData.person);
};

export const useSignupAdmin = (onSuccess, onError) => {
    return useMutation(addAdmin, {
        onSuccess,
        onError,
    });
};
