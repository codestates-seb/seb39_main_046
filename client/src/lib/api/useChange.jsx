import { useMutation } from "react-query";
import axios from "axios";

const changeInfo = ({id,token,log}) => {
    return axios.patch(`/member/${id}`,log, {
        headers: {
            "Authorization": token,
        },
    }).then((res)=>console.log(res));
};

export const useChange = (onSuccess, onError) => {
    return useMutation(changeInfo, {
        onSuccess,
        onError,
    });
};
