import axios from "axios";
import { api } from "../env";

export const getLogs = () => {
  const url = `${api}/logs`;
  return axios.get(url);
};

export const putLogs = (log) => {
  return axios.put(`${api}/logs/${log.id}`, log);
};
