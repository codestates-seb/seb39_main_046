import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";

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
