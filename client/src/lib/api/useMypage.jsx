import React from "react";
import { useQuery, useQueryClient } from "react-query";
import useStore from "../store";
import axiosInstance from "../../utils/axiosInastance";
import Loading from "../../components/common/loading/Loading";

const getInfomation = async (logInfo) => {
    const { data } = await axiosInstance.get("/member/myPage");
    return data;
};

export function useMypage() {
    // const queryClient = useQueryClient();

    const { logInfo } = useStore();
    const { status, data, error, isFetching } = useQuery(["infos"], () => getInfomation(logInfo), {
        keepPreviousData: true,
        staleTime: 2000,
        onSuccess: (data) => {
            // console.log(data);
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
