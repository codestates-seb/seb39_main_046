import { useMutation } from "react-query";
import axios from "axios";

const ReviewDelete = ({id,token,log}) => {
  return axios.delete(`/review/${id}`, log,{
    headers:{
      "Authorization": token,
    },
  });
};

export const useRivesDelete = (onSuccess, onError) => {
  return useMutation(ReviewDelete, {
    onSuccess,
    onError,
});
}