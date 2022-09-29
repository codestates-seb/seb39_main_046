import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getSerchProduct = async (productName) => {
    const data = await axiosInstance.get(`/product?productName=${productName}`);
    return data;
};

export function useSerchProduct() {
    const queryClient = useQueryClient();
    const { isKeyWord } = useStore();

    useEffect(() => {
        queryClient.prefetchQuery([queryKeys.serchProduct, isKeyWord], () => getSerchProduct(isKeyWord));
    }, [isKeyWord, queryClient]);

    const { status, data, error, isFetching } = useQuery(
        [queryKeys.productTop5, isKeyWord],
        () => getSerchProduct(isKeyWord),
        {
            staleTime: 2000,
            keepPreviousData: true,
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
