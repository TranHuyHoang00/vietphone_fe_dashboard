import api_admin from '@auths/api_admin';
const get_list_user = (date_filter) => {
    return api_admin.get(`/account/api/v1/list-user?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_user = (data) => {
    return api_admin.post(`/auth/api/v1/create-user`, data,);
}
const get_user = (id) => {
    return api_admin.get(`/account/api/v1/get-user/${id}`,);
}
const delete_user = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-user/${id}`,);
}
const edit_user = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-user/${id}`, data,);
}
export {
    get_list_user, create_user, get_user, delete_user, edit_user
}