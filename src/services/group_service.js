import apiAdmin from '@auths/apiAdmin';
const getListGroup = (date_filter) => {
    return apiAdmin.get(`/auth/api/v1/list-group?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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