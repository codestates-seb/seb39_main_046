import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const changeHeart = (productId, token) => {
    return axiosInstance
        .post(`/product/heart?productId=${productId}`, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => console.log(res));
};

const useHeart = (onSuccess, onError) => {
    return useMutation(changeHeart, {
        onSuccess,
        onError,
    });
};

export default useHeart;
