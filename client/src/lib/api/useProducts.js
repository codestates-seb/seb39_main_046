import { useQuery } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
const getMainProducts = async () => {
  const { data } = await axiosInstance.get("/main");
  return data;
};

export function useMainProducts() {
  const { status, data, error, isFetching } = useQuery(
    queryKeys.mainProducts,
    getMainProducts,
    {
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
