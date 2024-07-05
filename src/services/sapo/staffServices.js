import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListStaff = (dataFilter) => {
    return apiAdmin.get(`/account/api/v1/list-staff?${getUrlApi(dataFilter)}`);
}
const createStaff = (data) => {
    return apiAdmin.post(`/account/api/v1/create-staff`, data);
}
const getDataStaff = (id) => {
    return apiAdmin.get(`/account/api/v1/get-staff/${id}`);
}
const deleteStaff = (id) => {
    return apiAdmin.delete(`/account/api/v1/delete-staff/${id}`);
}
const editStaff = (id, data) => {
    return apiAdmin.put(`/account/api/v1/update-staff/${id}`, data);
}
export {
    getListStaff, createStaff, getDataStaff, deleteStaff, editStaff
}