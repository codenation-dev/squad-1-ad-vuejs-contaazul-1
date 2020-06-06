import axios from "axios";
import { api } from "../env";

export const addUser = (user) => {
  return axios.post(`${api}/users`, user);
};

export const getUsers = () => {
  return axios.get(`${api}/users`);
};

export const patchUser = user => {
  return axios.put(`${api}/users/${user.id}`, user)
};

export const getUsersByCredentials = async function(credentials)  { 
  const users = await axios.get(`${api}/users`);
  const user = users.data.find(user => user.email === credentials.email && user.password === credentials.password);
  return user;
};

export const setBearerToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
