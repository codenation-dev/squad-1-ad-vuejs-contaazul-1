import axios from "axios";
import { api } from "../env";

export const getLogs = () => {
    const url = `${api}/logs`
    return axios.get(url);
};

export const patchLogs = log => {
    console.log("chegou aq")
    return axios.put(`${api}/logs/${log.id}`, log)
}
