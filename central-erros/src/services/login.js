import axios from 'axios';

export const addUser = user => {
  return axios.post('https://5eb01c26e6828200164a66ae.mockapi.io/api/el/users', user)
};

export const getUsers = () => {
  return axios.get('https://5eb01c26e6828200164a66ae.mockapi.io/api/el/users')
};
