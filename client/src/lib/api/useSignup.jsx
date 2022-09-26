import {useMutation } from 'react-query';
import axios from 'axios';

const addPerson = (person) => {
  return axios.post('/member/signup', person).then(function(res){
    console.log(res.data);
  })
}

export const useSignup = (onSuccess, onError) => {
  return useMutation(addPerson,{
    onSuccess,
    onError
  })
}