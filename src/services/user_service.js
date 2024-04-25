import api_admin from '@auths/api_admin';
const get_list_user = (date_filter) => {
    return api_admin.get(`/auth/api/v1/list-user?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.is_active === '' ? '' : `&is_active=${date_filter.is_active}`}${date_filter.is_superuser === '' ? '' : `&is_superuser=${date_filter.is_superuser}`}${date_filter.groups === '' ? '' : `&groups=${date_filter.groups}`}`);
}
const create_user = (data) => {
    return api_admin.post(`/auth/api/v1/register`, data,);
}
const get_user = (id) => {
    return api_admin.get(`/auth/api/v1/get-user/${id}`,);
}
const delete_user = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-user/${id}`,);
}
const edit_user = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-user/${id}`, data,);
}
const get_list_user_permission = () => {
    return api_admin.get(`/auth/api/v1/get-user-permission`,);
}
export {
    get_list_user, create_user, get_user, delete_user, edit_user, get_list_user_permission
}