import axios from "axios";
import { api } from "../env";

export const addUser = user => {
  return axios.post(`${api}/users`, user);
};

export const getUsers = () => {
  return axios.get(`${api}/users`)
};

export const patchUser = user => {
  return axios.put(`${api}/users/${user.id}`, user)
}
