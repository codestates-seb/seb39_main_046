import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import axios from "axios";

const ProfileDelete = () => {
  return axiosInstance.delete(`/member/profile`);
};

export const useDelteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation (ProfileDelete,{
    onSuccess: () => {
      queryClient.invalidateQueries(["infos"])
      alert("프로필 삭제를 완료했어요");
    }
  })
}

const ProfileAdd = (fd) => {
  return axios.post('/member/profile',fd,{
    headers:{
      Authorization : sessionStorage.getItem("token"),
      "Content-Type": `multipart/form-data`,
    }
  });
};

export const useAddProfile = () => {
  const queryClient = useQueryClient();
  return useMutation (ProfileAdd, {
    onSuccess: () => {
      queryClient.invalidateQueries(["infos"])
      alert("등록 완료");
    },
    onError: (e) => {
      console.log("등록실패");
    }
  })
}