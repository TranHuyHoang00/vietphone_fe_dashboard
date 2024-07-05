import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListUser = (dataFilter) => {
    return apiAdmin.get(`/auth/api/v1/list-user?${getUrlApi(dataFilter)}`);
}
const createUser = (data) => {
    return apiAdmin.post(`/auth/api/v1/register`, data,);
}
const getDataUser = (id) => {
    return apiAdmin.get(`/auth/api/v1/get-user/${id}`,);
}
const deleteUser = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-user/${id}`,);
}
const editUser = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-user/${id}`, data,);
}
const getListUserPermission = () => {
    return apiAdmin.get(`/auth/api/v1/get-user-permission`,);
}
export {
    getListUser, createUser, getDataUser, deleteUser, editUser, getListUserPermission
}