import api_admin from '@auths/api_admin';
const get_list_group = (date_filter) => {
    return api_admin.get(`/auth/api/v1/list-group?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_group = (data) => {
    return api_admin.post(`/auth/api/v1/create-group`, data);
}
const get_group = (id) => {
    return api_admin.get(`/auth/api/v1/get-group/${id}`);
}
const delete_group = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-group/${id}`);
}
const edit_group = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-group/${id}`, data);
}
export {
    get_list_group, create_group, get_group, delete_group, edit_group
}