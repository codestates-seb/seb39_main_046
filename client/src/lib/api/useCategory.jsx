import { useQuery, useQueryClient, useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../react-query/constant";
import Loading from "../../components/common/loading/Loading";
import useStore from "../store";

const getCategory = async (pageNum) => {
    const { data } = await axiosInstance.get(`/category?page=${pageNum}&size=7`);
    return data;
};

const postCategory = async (newCategory) => {
    const data = await axiosInstance.post(`/category`, newCategory);
    return data;
};

const deleteCategory = (categoryId) => {
    return axiosInstance.delete(`/category/40`);
};

const updateCategory = (categoryId, updateData) => {
    return axiosInstance.patch(`/category/${categoryId}`, updateData);
};

export function useCategory() {
    const { isCategoryPage } = useStore();
    const { status, data, error, isFetching } = useQuery(
        [queryKeys.category, isCategoryPage],
        () => getCategory(isCategoryPage),
        {
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

export const useCategoryMutation = (newinfo) => {
    const { mutate, isSuccess } = useMutation(() => postCategory(newinfo));
    return { mutate, isSuccess };
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteCategory, {
        onMutate: (variables) => {
            console.log("onMutate", variables);
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries([queryKeys.category]);
            // queryClient.setQueryData([queryKeys.category, { id: 5 }], data);
            console.log("success", data, variables, context);
        },
        onError: (e) => {},
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation((categoryId) => updateCategory(categoryId), {
        onMutate: (variables) => {
            console.log("onMutate", variables);
        },
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData([queryKeys.category, { id: 5 }], data);
            console.log("success", data, variables, context);
        },
        onError: (e) => {},
    });
};
