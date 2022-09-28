import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const changeReviewHeart = (reviewId, token) => {
    return axiosInstance
        .post(`/review/heart?reviewId=${reviewId}`, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => console.log(res));
};

const useReviewHeart = (onSuccess, onError) => {
    return useMutation(changeReviewHeart, {
        onSuccess,
        onError,
    });
};

export default useReviewHeart;
