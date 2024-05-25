import apiAdmin from '@auths/apiAdmin';
const getListGroup = (date_filter) => {
    return apiAdmin.get(`/auth/api/v1/list-group?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_group = (data) => {
    return apiAdmin.post(`/auth/api/v1/create-group`, data);
}
const get_group = (id) => {
    return apiAdmin.get(`/auth/api/v1/get-group/${id}`);
}
const delete_group = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-group/${id}`);
}
const edit_group = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-group/${id}`, data);
}
export {
    getListGroup, create_group, get_group, delete_group, edit_group
}