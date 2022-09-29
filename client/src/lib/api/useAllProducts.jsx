import { useQuery } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";

const getAllProducts = async () => {
    const { data } = await axiosInstance.get("/product/all");
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
