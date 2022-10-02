import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import axios from "axios";

const ReviewDelete = (id) => {
  return axiosInstance.delete(`/review/${id}`);
};

export const useRivesDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["MyReivew"]);
      console.log("삭제 완료");
    },
    onError: (e) => {
      alert("리뷰삭제는 자신것만 할 수 있습니다.");
    },
});
}

const ReviewAdd = ({id,fd,content}) => {
  return axios.post(`/review/${id}`, fd, content,{
    headers:{
      Authorization: sessionStorage.getItem("token"),
      "Content-Type": `multipart/form-data`,
    }
  });
}

export const useReviewAdd = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewAdd, {
    onSuccess:() => {
      queryClient.invalidateQueries(["MyReivew"]);
      console.log("등록 완료");
    },
    onError: (e) => {
      alert("등록 실패 ");
    }
  });
}

const ReviewPatch = ({id, fd,content}) => {
  return axios.patch(`/review/${id}`,{
    headers:{
      Authorization: sessionStorage.getItem("token"),
      "Content-Type": `multipart/form-data`,
    }
  });
}

export const usePatchRevies = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewPatch, {
    onSuccess:() => {
      queryClient.invalidateQueries(["MyReivew"]);
      console.log("수정 완료");
    },
    onError: (e) => {
      alert("수정 실패 ");
    }
  })
}
