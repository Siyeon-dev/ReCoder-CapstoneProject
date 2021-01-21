import axios from "axios";

const api = axios.create({
    baseURL : "http://3.89.30.234:3000/"
});

export const UserApi = {
    userLogin : () => api.post("login"),
    userSignup : () => api.post("signup")
};