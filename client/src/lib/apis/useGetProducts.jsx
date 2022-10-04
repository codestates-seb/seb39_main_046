import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

// 정렬된 상품 데이터
const getProducts = async (categoryNum, sortNum, companyName, pageNum) => {
    const { data } = await axiosInstance.get(
        `/product/allByCompany/${categoryNum}/${sortNum}?company=${companyName}&page=${pageNum}`,
    );
    return data;
};
export function useProducts() {
    const queryClient = useQueryClient();
    const { isCategoryTab, isSortNum, isStoreTab, isCurrentPage } = useStore();
    useEffect(() => {
        queryClient.prefetchQuery([queryKeys.products, isCategoryTab, isSortNum, isStoreTab, isCurrentPage], () =>
            getProducts(isCategoryTab, isSortNum, isStoreTab, isCurrentPage),
        );
    }, [isCategoryTab, isSortNum, isStoreTab, isCurrentPage, queryClient]);

    const { status, data, error, isFetching } = useQuery(
        [queryKeys.products, isCategoryTab, isSortNum, isStoreTab, isCurrentPage],
        () => getProducts(isCategoryTab, isSortNum, isStoreTab, isCurrentPage),
        {
            staleTime: 2000,
            keepPreviousData: true,
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

// 모든 상품 데이터
const getAllProducts = async () => {
    const data = await axiosInstance.get("/product/all");
    return data;
};

export function useAllProducts() {
    const { status, data, error, isFetching } = useQuery(queryKeys.allProducts, getAllProducts, {
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
        return <Loading />;
    }
    return data;
}

// 상품 검색 데이터
const getSerchProduct = async (productName) => {
    const data = await axiosInstance.get(`/product?productName=${productName}`);
    return data;
};

export function useSerchProduct() {
    const queryClient = useQueryClient();
    const { isKeyword } = useStore();

    useEffect(() => {
        queryClient.prefetchQuery([queryKeys.serchProduct, isKeyword], () => getSerchProduct(isKeyword));
    }, [isKeyword, queryClient]);

    const { status, data, error, isFetching } = useQuery(
        [queryKeys.productTop5, isKeyword],
        () => getSerchProduct(isKeyword),
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
