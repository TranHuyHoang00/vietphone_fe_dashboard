import api_admin from '@auths/api_admin';
const get_list_permission = (date_filter) => {
    return api_admin.get(`/auth/api/v1/list-permission?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_permission = (data) => {
    return api_admin.post(`/auth/api/v1/create-permission`, data);
}
const get_permission = (id) => {
    return api_admin.get(`/auth/api/v1/get-permission/${id}`);
}
const delete_permission = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-permission/${id}`);
}
const edit_permission = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-permission/${id}`, data);
}
export {
    get_list_permission, create_permission, get_permission, delete_permission, edit_permission
}