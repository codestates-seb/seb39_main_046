import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getMainProducts = async () => {
    const { data } = await axiosInstance.get("/main");
    return data;
};

export function useMainProducts() {
    const { status, data, error, isFetching } = useQuery(queryKeys.mainProducts, getMainProducts, {
        retry: 0,
        onSuccess: (data) => {},
        onError: (e) => {},
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

const getTop5Products = async (companyName) => {
    const data = await axiosInstance.get(`/product/top5?company=${companyName}`);
    return data;
};

export function useTop5Products() {
    const queryClient = useQueryClient();
    const { isMainTab } = useStore();

    useEffect(() => {
        queryClient.prefetchQuery([queryKeys.productTop5, isMainTab], () => getTop5Products(isMainTab));
    }, [isMainTab, queryClient]);

    const { status, data, error, isFetching } = useQuery(
        [queryKeys.productTop5, isMainTab],
        () => getTop5Products(isMainTab),
        {
            staleTime: 2000,
            cacheTime: Infinity,
            keepPreviousData: true,
            retry: 0,
            onSuccess: (data) => {
                // console.log(data);
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
