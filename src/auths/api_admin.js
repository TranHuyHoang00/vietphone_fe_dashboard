import axios from 'axios';
import { get_local_account, set_local_account } from './local_storage';

const api_admin = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
});

api_admin.interceptors.request.use(
    async (request) => {
        let data_account = await get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        let token = data_account.data.access;
        if (token) { request.headers.Authorization = `Bearer ${token}`; }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api_admin.interceptors.response.use(
    (response) => { return response; },
    async (error) => {
        const originalConfig = error.config;
        if (error.response.status === 401) {
            let data_account = await get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
            let refresh = data_account.data.refresh;
            let token;
            if (!refresh) {
                return Promise.reject(error);
            }
            try {
                let data = await axios.post(`${process.env.REACT_APP_API}/auth/api/v1/token/refresh`, { refresh: refresh });
                if (data && data.data && data.data.success === 1) {
                    token = data.data.data.access;
                    originalConfig.headers.Authorization = `Bearer ${token}`;
                    data_account.data.access = token;
                    set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data_account.data);
                    return api_admin(originalConfig);
                } else {
                    return Promise.reject(error);
                }
            } catch (error) {
                return Promise.reject(error);
            }

        }
        return Promise.reject(error);
    }
);

export default api_admin;
