import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import axios from "axios";


const ProductAdd = (fd) => {
  return axios.post(`/product/admin`,fd,{
    headers:{
      Authorization : sessionStorage.getItem("token"),
      "Content-Type": `multipart/form-data`,
    }
  });
}

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation (ProductAdd, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"])
      alert("등록완료");
    },
    onError: (e) => {
      console.log("등록 실패");
    }
  })
}

const ProductDelete = (id) => {
  return axiosInstance.delete(`/product/admin?productId=${id}`)
}

export const DeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation (ProductDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"])
      alert("삭제완료");
    },
    onError: (e) => {
      console.log("삭제 실패");
    }
  })
}

const ProductPatch = (setData) => {
  return axiosInstance.patch(`/product/admin?productId=${setData.PrId}`,setData.EditData)
}

export const PatchProduct = () => {
  const queryClient = useQueryClient();
  return useMutation (ProductPatch, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"])
      alert("수정완료");
    },
    onError:(e) => {
      console.log("수정 실패");
    }
  })
}