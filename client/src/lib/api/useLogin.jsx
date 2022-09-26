import {useMutation } from 'react-query';
import axios from 'axios';

const loginperson = (log) => {
  return axios.post('/login', log )
}


export const useLogin = () => {
  return useMutation(loginperson)
}