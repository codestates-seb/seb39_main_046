import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import useStore from "../store";
const postFoodTest = (categoryId) => {
    return axiosInstance.post(`/member/pbti/${categoryId}`).then((res) => useStore.setState({ isTestNum: res.data }));
};

const useFoodTest = () => {
    const queryClient = useQueryClient();
    return useMutation(postFoodTest, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.foodTest]);
        },
        onError: (e) => {
            <p>("추천상품이 안나오는 중..")</p>;
        },
    });
};

export default useFoodTest;
