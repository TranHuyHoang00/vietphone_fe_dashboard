import axios from "axios";

const Login = (phone, password) => {
    return axios.post(`${process.env.REACT_APP_API}/auth/api/v1/token`, { phone: phone, password: password });
}
export {
    Login
}