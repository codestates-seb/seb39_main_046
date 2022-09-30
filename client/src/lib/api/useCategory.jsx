import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";
const getCategory = async (token) => {
    const { data } = await axiosInstance.get(`/category?page=1`);
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
    const { logInfo } = useStore();
    const { status, data, error, isFetching } = useQuery([queryKeys.category, logInfo], () => getCategory(logInfo), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (e) => {
            console.log(e.message);
        },
    });
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    if (isFetching) {
        return <Loading />; //훅에서 처리할필요가있나?!!?
        // 데이터리턴, 리액트컴포넌트 리턴을 분리하면 좋지않을까
        // 리턴값을 리액트쿼리의 값으로
        // 타스로 작성했다면 복잡해졌을꺼같다.
        // 렌더화면을 그리는건 컴포넌트에 위임을하고 데이터로딩상태정도만 하고 컴포넌트에서 그걸 보고 판다하도록 로직을 분리해라
    }
    return data;
}
