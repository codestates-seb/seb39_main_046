import {useMutation } from 'react-query';
import axios from 'axios';

const loginperson = (log) => {
  return axios.post(`/member/login`, log)
}


export const useLogin = (onSuccess,onError) => {
  return useMutation(loginperson,{
    onSuccess,
    onError
  })
}