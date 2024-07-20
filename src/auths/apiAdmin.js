import axios from 'axios';
import { getDataLocal, setDataLocal, deleteDataLocal } from './localStorage';
const apiAdmin = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
});
apiAdmin.interceptors.request.use(
    async (request) => {
        const dataAccount = await getDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        const token = dataAccount?.data?.access;
        if (token) { request.headers.Authorization = `Bearer ${token}`; }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);
apiAdmin.interceptors.response.use(
    (response) => { return response; },
    async (error) => {
        const originalConfig = error?.config;
        if (error?.response?.status === 401 && error?.response?.data?.error?.code === 'token_not_valid') {
            const dataAccount = await getDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
            const refresh = dataAccount?.data?.refresh;
            let token;
            if (!refresh) {
                return Promise.reject(error);
            }
            try {
                const data = await axios.post(`${process.env.REACT_APP_API}/auth/api/v1/token/refresh`, { refresh: refresh });
                if (data && data.data && data.data.success === 1) {
                    token = data.data.data.access;
                    originalConfig.headers.Authorization = `Bearer ${token}`;
                    dataAccount.data.access = token;
                    setDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, dataAccount.data);
                    return apiAdmin(originalConfig);
                } else {
                    const isResult = deleteDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
                    if (isResult) {
                        this.props.history.push('/admin/login');
                        window.location.href = '/';
                    }
                    return Promise.reject(error);
                }
            } catch (error) {
                const isResult = deleteDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
                if (isResult) {
                    window.location.href = '/';
                }
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default apiAdmin;
