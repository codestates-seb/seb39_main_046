import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const addPerson = (person) => {
    return axiosInstance.get("/member/signup", person);
};

export const useSignup = (onSuccess, onError) => {
    return useMutation(addPerson, {
        onSuccess,
        onError,
    });
};
