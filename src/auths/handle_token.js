import axios from 'axios';
import { get_local_account, set_local_account } from './local_storage';

const handle_token_local = async (account) => {
    let token_init = null;
    let token_checked = null;
    let data_account_raw = get_local_account(account);
    if (data_account_raw) {
        token_init = data_account_raw.data.access;
        token_checked = await check_token(account, token_init);
    }
    return token_checked;
}
const check_token = async (account, token_init) => {
    const api = axios.create({ baseURL: `${process.env.REACT_APP_API}`, });
    api.interceptors.request.use(
        (config) => {
            let token = token_init;
            if (token) { config.headers.Authorization = `Bearer ${token}`; }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    api.interceptors.response.use(
        (response) => {
            return true;
        },
        async (error) => {
            if (error.response.status === 401) {
                return false;
            }
            return Promise.reject(error);
        }
    );
    let data_checked = null;
    if (process.env.REACT_APP_LOCALHOST_ACOUNT_DB == account) {
        data_checked = await api.get(`/auth/api/v1/list-role`,);
    }
    if (process.env.REACT_APP_LOCALHOST_ACOUNT_USER == account) {
        data_checked = await api.get(`ticketify/api/v1/get-event/${process.env.REACT_APP_EVENT_CODE}`);
    }
    if (data_checked == true) {
        return token_init;
    } else {
        let data_account_raw = null;
        data_account_raw = get_local_account(account);
        let data_token = await axios.post(`${process.env.REACT_APP_API}auth/api/v1/token/refresh`, { refresh: data_account_raw.data.refresh });
        let token_new = data_token.data.data.access;
        let data_account_new = data_account_raw.data;
        data_account_new.access = token_new;
        set_local_account(account, data_account_new);
        return token_new;
    }

}
export default handle_token_local;