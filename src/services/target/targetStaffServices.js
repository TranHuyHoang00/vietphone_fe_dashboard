import apiAdmin from '@auths/apiAdmin';
const getListTargetStaff = ({ page, limit, search, month }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const monthQuery = month ? `&month=${month}` : '';
    const url = `/analytic/api/v1/list-staff-monthly-target?page=${page}&limit=${limit}${searchQuery}${monthQuery}`;
    return apiAdmin.get(url);
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