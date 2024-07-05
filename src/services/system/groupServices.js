import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListGroup = (dataFilter) => {
    return apiAdmin.get(`/auth/api/v1/list-group?${getUrlApi(dataFilter)}`);
}
const createGroup = (data) => {
    return apiAdmin.post(`/auth/api/v1/create-group`, data);
}
const getDataGroup = (id) => {
    return apiAdmin.get(`/auth/api/v1/get-group/${id}`);
}
const deleteGroup = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-group/${id}`);
}
const editGroup = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-group/${id}`, data);
}
export {
    getListGroup, createGroup, getDataGroup, deleteGroup, editGroup
}