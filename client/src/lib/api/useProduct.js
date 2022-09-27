import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getProducts = async (categoryNum, sortNum, companyName, pageNum) => {
  const { data } = await axiosInstance.get(
    `/product/allByCompany/${
      categoryNum + 1
    }/${sortNum}?company=${companyName}&page=${pageNum}`
  );
  return data;
};
export function useProducts() {
  const queryClient = useQueryClient();
  const { isCategoryTab, isSortNum, isStoreTab, isCurrentPage } = useStore();
  useEffect(() => {
    queryClient.prefetchQuery(
      [queryKeys.products, isCategoryTab, isSortNum, isStoreTab, isCurrentPage],
      () => getProducts(isCategoryTab, isSortNum, isStoreTab, isCurrentPage)
    );
  }, [isCategoryTab, isSortNum, isStoreTab, isCurrentPage, queryClient]);

  const { status, data, error, isFetching } = useQuery(
    [queryKeys.products, isCategoryTab, isSortNum, isStoreTab, isCurrentPage],
    () => getProducts(isCategoryTab, isSortNum, isStoreTab, isCurrentPage),
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
    }
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

// const getTop5Products = async (companyName) => {
//   const { data } = await axiosInstance.get(
//     `/product/top5?company=${companyName}`
//   );
//   return data;
// };

// export function useTop5Products() {
//   const queryClient = useQueryClient();
//   const { isMainTab } = useStore();

//   useEffect(() => {
//     queryClient.prefetchQuery([queryKeys.productTop5, isMainTab], () =>
//       getTop5Products(isMainTab)
//     );
//   }, [isMainTab, queryClient]);

//   const { status, topData, error, isFetching } = useQuery(
//     [queryKeys.productTop5, isMainTab],
//     () => getTop5Products(isMainTab),
//     {
//       staleTime: 2000,
//       keepPreviousData: true,
//       refetchOnWindowFocus: false,
//       retry: 0,
//       onSuccess: (data) => {
//         console.log(data);
//       },
//       onError: (e) => {
//         console.log(e.message);
//       },
//     }
//   );
//   if (status === "loading") {
//     return <Loading />;
//   }

//   if (status === "error") {
//     return <span>Error: {error.message}</span>;
//   }
//   if (isFetching) {
//     return <Loading />;
//   }
//   return topData;
// }
