import axios from "axios";

const api = axios.create({
    baseURL : "http://3.89.30.234:3000/"
});

export const UserApi = {
    userLogin : () => api.post("login"),
    userSignup : () => api.post("signup")
};

export const TeacherApi = {
    createClass : () => api.post("classcreate"), /* 클래스 생성 */
    classInfo : () => api.post("classinfo") /* 클래스 정보 */
};