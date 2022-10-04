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
      queryClient.invalidateQueries(["productReview"]);
      alert("삭제 완료");
    },
    onError: (e) => {
      alert("리뷰삭제는 자신것만 할 수 있습니다.");
    },
});
}

const ReviewAdd = (setData) => {
  return axiosInstance.post(`/review/${setData.key}`, setData.fd2);
}

export const useReviewAdd = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewAdd, {
    onSuccess:() => {
      queryClient.invalidateQueries(["MyReivew"]);
      queryClient.invalidateQueries(["productReview"]);
      alert("등록 완료");
    },
    onError: (e) => {
      alert("사진을 넣어주세요! ");
    }
  });
}

const ReviewPatch = (PatchData) => {
  return axiosInstance.patch(`/review/${PatchData.key}`,PatchData.fd4);
}

export const usePatchRevies = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewPatch, {
    onSuccess:() => {
      queryClient.invalidateQueries(["MyReivew"]);
      console.log("수정 완료");
    },
    onError: (e) => {
      alert("자신의 댓글만 수정이 가능합니다. ");
    }
  })
}

export const usePatchProductsReviwes = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewPatch, {
    onSuccess:() => {
      queryClient.invalidateQueries(["productReview"]);
      alert("수정 완료");
    },
    onError:(e) => {
      alert("자신의 댓글만 수정이 가능합니다.");
    }
  })
}

