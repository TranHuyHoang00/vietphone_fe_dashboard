import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListStaffRole = (dataFilter) => {
    return apiAdmin.get(`/account/api/v1/list-staff-role?${getUrlApi(dataFilter)}`);
}
const createStaffRole = (data) => {
    return apiAdmin.post(`/account/api/v1/create-staff-role`, data);
}
const getDataStaffRole = (id) => {
    return apiAdmin.get(`/account/api/v1/get-staff-role/${id}`);
}
const deleteStaffRole = (id) => {
    return apiAdmin.delete(`/account/api/v1/delete-staff-role/${id}`);
}
const editStaffRole = (id, data) => {
    return apiAdmin.put(`/account/api/v1/update-staff-role/${id}`, data);
}
export {
    getListStaffRole, createStaffRole, getDataStaffRole, deleteStaffRole, editStaffRole
}