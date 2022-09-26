import {useQuery, useMutation } from 'react-query';
import axios from 'axios';

const addPerson = (person) => {
  return axios.post('/member/signup', person )
}

export const useSignup = () => {
  return useMutation(addPerson)
}