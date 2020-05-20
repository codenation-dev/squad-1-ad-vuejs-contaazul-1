import axios from "axios";

export const getLogs = () => {
    const url = `https://5eb01c26e6828200164a66ae.mockapi.io/api/el/logs`
    return axios.get(url);
};

