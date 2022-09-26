import {useMutation } from 'react-query';
import axios from 'axios';

const loginperson = (log) => {
  return axios.post('/member/login', log).then(function (res){
    console.log(res.data);
  }).then((data) => console.log(data));
}


export const useLogin = () => {
  return useMutation(loginperson)
}