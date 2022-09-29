import { useMutation } from "react-query";
import axios from "axios";

const ReviewMutation = ({id,token,log}) => {
  return axios.patch(`/review/${id}`,log, {
      headers: {
          "Authorization": token,
      },
  })
};

export const useRivesMutation = (onSuccess, onError) => {
  return useMutation(ReviewMutation, {
    onSuccess,
    onError,
});
}