import React from "react";
import { useQuery, useQueryClient } from "react-query";
import useStore from "../store";
import axiosInstance from "../../utils/axiosInastance";
import Loading from "../../components/common/loading/Loading";
import axios from "axios";


const Getinfo = async (logInfo) => {
    const {data} =  await axios.get("member/myPage", {
        headers: {
            Authorization: logInfo,
        },
    });
    return data;
};

export function useMypage() {
    // const queryClient = useQueryClient();

    const { logInfo } = useStore();
    const { status, data, error, isFetching, isLoading } = useQuery(["infos"], () => Getinfo(logInfo), {
        keepPreviousData: true,
        staleTime: 2000,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (e) => {
            console.log(e.message);
        },
    });

    if (isLoading) {
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
