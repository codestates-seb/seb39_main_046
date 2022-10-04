import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";

const changeHeart = (productId) => {
    return axiosInstance.post(`/product/heart?productId=${productId}`).then((res) => console.log(res));
};

export const useHeart = () => {
    const queryClient = useQueryClient();
    return useMutation(changeHeart, {
        onMutate: (variables) => {
            console.log("onMutate", variables);
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries([queryKeys.product]);
            queryClient.invalidateQueries([queryKeys.productTop5]);
            queryClient.invalidateQueries([queryKeys.mainProducts]);
            queryClient.invalidateQueries([queryKeys.products]);
            queryClient.invalidateQueries(["MyReivew"]);
            queryClient.invalidateQueries(["LikeReviews"]);
            queryClient.invalidateQueries(["jjimBascket"]);
            queryClient.invalidateQueries(["infos"]);
            console.log("success", data, variables, context);
        },
        onError: (e) => {},
    });
};

const changeReviewHeart = (reviewId, token) => {
    return axiosInstance.post(`/review/heart?reviewId=${reviewId}`).then((res) => console.log(res));
};

export const useReviewHeart = () => {
    const queryClient = useQueryClient();
    return useMutation(changeReviewHeart, {
        onMutate: (variables) => {
            console.log("onMutate", variables);
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries([queryKeys.product]);
            queryClient.invalidateQueries([queryKeys.productTop5]);
            queryClient.invalidateQueries([queryKeys.mainProducts]);
            queryClient.invalidateQueries([queryKeys.products]);
            console.log("success", data, variables, context);
        },
        onError: (e) => {},
    });
};
