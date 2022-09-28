import React from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import useStore from "../store";

const getInfomation = async (logInfo) => {
  const { data } = await axios.get("/member/myPage", {
    headers: {
      "Content-Type": "application/json",
      Authorization: logInfo,
    },
  });
  return data;
};

export function useMypage() {
  // const queryClient = useQueryClient();

  const { logInfo } = useStore();
  const { status, data, isError, isLoading, isFetching } = useQuery(
    ["infos", logInfo],
    () => getInfomation(logInfo),
    {
      keepPreviousData: true,
      staleTime: 2000,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  if (status === "loading") return <h3>로딩중</h3>;

  if (status === "error") {
    return <h3>에러발생</h3>;
  }
  if (isFetching) {
    return <h3>로딩중</h3>;
  }
  return data;
}
