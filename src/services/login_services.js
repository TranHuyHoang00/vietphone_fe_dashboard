import axios from "axios";

const Login = (username, password) => {
    return axios.post(`${process.env.REACT_APP_API}auth/api/v1/login`, { username: username, password: password });
}
export {
    Login
}