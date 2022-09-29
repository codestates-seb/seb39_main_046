import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import useStore from "../store";
const postFoodTest = (categoryId) => {
    return axiosInstance
        .post(
            `/member/pbti/${categoryId}`,
            {},
            {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            },
        )
        .then((res) => useStore.setState({ isTestNum: res.data }));
};

const useFoodTest = () => {
    const queryClient = useQueryClient();
    return useMutation(postFoodTest, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.foodTest]);
        },
        onError: (e) => {},
    });
};

export default useFoodTest;
