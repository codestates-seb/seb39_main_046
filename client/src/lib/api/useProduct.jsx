import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getDeatilProduct = async (productNum) => {
    const { data } = await axiosInstance.get(`/product/201`);
    return data;
};

// export function useProduct() {
//     const { isDetail } = useStore();
//     console.log(isDetail);

//     const { status, data, error, isFetching } = useQuery(
//         [queryKeys.product, isDetail],
//         () => getDeatilProduct(isDetail),
//         {
//             staleTime: 2000,
//             keepPreviousData: true,
//             refetchOnWindowFocus: false,
//             retry: 0,
//             onSuccess: (data) => {
//                 console.log(data);
//             },
//             onError: (e) => {
//                 console.log(e.message);
//             },
//         },
//     );
//     if (status === "loading") {
//         return <Loading />;
//     }

//     if (status === "error") {
//         return <span>Error: {error.message}</span>;
//     }
//     if (isFetching) {
//         return <Loading />;
//     }
//     return data;
// }
