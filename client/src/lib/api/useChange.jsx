import { useMutation } from "react-query";
import axios from "axios";

const changeInfo = (content, id, token) => {
    return axios.patch(`/member/${id}`, {
        headers: {
            Authorization: token,
        },
    });
};

export const useInfo = (onSuccess, onError) => {
    return useMutation(changeInfo, {
        onSuccess,
        onError,
    });
};
