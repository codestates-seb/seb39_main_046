import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const changeInfo = (EditData) => {
    return axiosInstance.patch(`/member/${EditData.id}`, EditData.log).then((res) => console.log(res));
};

export const useChange = (onSuccess, onError) => {
    return useMutation(changeInfo, {
        onSuccess,
        onError,
    });
};
