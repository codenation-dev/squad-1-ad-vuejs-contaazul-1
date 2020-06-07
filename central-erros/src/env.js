import axios from 'axios'

export const api = "https://5eb01c26e6828200164a66ae.mockapi.io/api/el";

export const setBearerToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}