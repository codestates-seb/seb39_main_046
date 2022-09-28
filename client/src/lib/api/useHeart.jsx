import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";

const changeHeart = (productId) => {
    return axiosInstance
        .post(
            `/product/heart?productId=${productId}`,
            {},
            {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            },
        )
        .then((res) => console.log(res));
};

const useHeart = () => {
    const queryClient = useQueryClient();
    return useMutation(changeHeart, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.products, queryKeys.product]);
        },
        onError: (e) => {},
    });
};

export default useHeart;
