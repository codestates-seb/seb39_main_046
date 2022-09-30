import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getCategory = async (pageNum) => {
    const { data } = await axiosInstance.get(`/category?page=${pageNum}&size=12`);
    return data;
};
const updateCategory = async (token) => {
    const { data } = await axiosInstance.patch(`/category/1`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    return data;
};
const deleteCategory = async (token) => {
    const { data } = await axiosInstance.delete(`/category/1`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    return data;
};
export function useCategory() {
    const { isCategoryPage } = useStore();
    const { status, data, error, isFetching } = useQuery(
        [queryKeys.category, isCategoryPage],
        () => getCategory(isCategoryPage),
        {
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (e) => {
                console.log(e.message);
            },
        },
    );
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    if (isFetching) {
        return <Loading />;
    }
    return data;
}
