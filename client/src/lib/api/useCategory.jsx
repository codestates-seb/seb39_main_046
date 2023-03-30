import { useQuery, useQueryClient, useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getCategory = async (pageNum) => {
    const { data } = await axiosInstance.get(`/category?page=${pageNum}&size=6`);
    return data;
};

const postCategory = async (newCategory) => {
    const data = await axiosInstance.post(`/category`, newCategory);
    return data;
};

const deleteCategory = (categoryId) => {
    return axiosInstance.delete(`/category/${categoryId}`);
};

const updateCategory = (categoryId, updateCategory) => {
    return axiosInstance.patch(`/category/${categoryId}`, updateCategory);
};

export function useCategory() {
    const { isCurrentPage } = useStore();
    const { status, data, error, isFetching } = useQuery(
        [queryKeys.category, isCurrentPage],
        () => getCategory(isCurrentPage),
        {
            refetchOnWindowFocus: false,
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

export const useCategoryMutation = (newinfo) => {
    const queryClient = useQueryClient();
    const { mutate, isSuccess } = useMutation(() => postCategory(newinfo), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.category]);
        },
        onError: (e) => {
            alert("등록 실패 ");
        },
    });
    return { mutate, isSuccess };
};
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteCategory, {
        onMutate: (variables) => {
            // console.log("onMutate", variables);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.category]);
        },
        onError: (e) => {
            alert("카테고리 삭제는 관리자만 할 수 있습니다.");
        },
    });
};

export const useUpdateCategory = (id, newinfo) => {
    const queryClient = useQueryClient();
    const { mutate, isSuccess } = useMutation(() => updateCategory(id, newinfo), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.category]);
            // console.log("수정 완료");
        },
        onError: (e) => {
            alert("수정 실패 ");
        },
    });
    return { mutate, isSuccess };
};
