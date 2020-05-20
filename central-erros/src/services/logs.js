import axios from "axios";
import { api } from "../env";

export const getLogs = () => {
    const url = `${api}/logs`
    return axios.get(url);
};

