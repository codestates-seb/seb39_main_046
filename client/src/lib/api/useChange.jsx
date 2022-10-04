import { useMutation } from "react-query";
import axios from "axios";

const changeInfo = (EditData) => {
    return axios.patch(`/member/${EditData.id}`,EditData.log, {
        headers: {
            "Authorization": EditData.token,
        },
    }).then((res)=>console.log(res));
};

export const useChange = (onSuccess, onError) => {
    return useMutation(changeInfo, {
        onSuccess,
        onError,
    });
};
