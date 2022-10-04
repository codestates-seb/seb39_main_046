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

const addAdmin = (person) => {
    return axios.post("/member/signup/admin", person);
};

export const useSignupAdmin = (onSuccess, onError) => {
    return useMutation(addAdmin, {
        onSuccess,
        onError,
    });
};
