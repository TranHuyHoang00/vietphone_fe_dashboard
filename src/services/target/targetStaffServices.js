import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListTargetStaff = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-staff-monthly-target?${getUrlApi(dataFilter)}`);
}
const createTargetStaff = (data) => {
    return apiAdmin.post(`/analytic/api/v1/create-staff-monthly-target`, data);
}
const getDataTargetStaff = (id) => {
    return apiAdmin.get(`/analytic/api/v1/get-staff-monthly-target/${id}`);
}
const deleteTargetStaff = (id) => {
    return apiAdmin.delete(`/analytic/api/v1/delete-staff-monthly-target/${id}`);
}
const editTargetStaff = (id, data) => {
    return apiAdmin.put(`/analytic/api/v1/update-staff-monthly-target/${id}`, data);
}
export {
    getListTargetStaff, createTargetStaff, getDataTargetStaff, deleteTargetStaff, editTargetStaff
}