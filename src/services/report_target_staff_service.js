import apiAdmin from '@auths/apiAdmin';
const getListTargetStaff = (date_filter) => {
    return apiAdmin.get(`/analytic/api/v1/list-staff-monthly-target?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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