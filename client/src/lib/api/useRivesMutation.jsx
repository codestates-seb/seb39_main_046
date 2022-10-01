import { useMutation,useQueryClient} from "react-query";
import axiosInstance from "../../utils/axiosInastance";

const ReviewMutation = ({id,img,log}) => {
  return axiosInstance.patch(`/review/${id}`,img,log)
};

export const useRivesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(ReviewMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["MyReivew"]);
      console.log("삭제 완료");
    },
    onError: (e) => {
      alert("리뷰삭제는 자신것만 할 수 있습니다.");
    },
  });
}