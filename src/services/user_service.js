import apiAdmin from '@auths/apiAdmin';
const get_list_user = (date_filter) => {
    return apiAdmin.get(`/auth/api/v1/list-user?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.is_active === '' ? '' : `&is_active=${date_filter.is_active}`}${date_filter.isSuperUser === '' ? '' : `&isSuperUser=${date_filter.isSuperUser}`}${date_filter.groups === '' ? '' : `&groups=${date_filter.groups}`}`);
}
const create_user = (data) => {
    return apiAdmin.post(`/auth/api/v1/register`, data,);
}
const get_user = (id) => {
    return apiAdmin.get(`/auth/api/v1/get-user/${id}`,);
}
const delete_user = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-user/${id}`,);
}
const edit_user = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-user/${id}`, data,);
}
const get_list_user_permission = () => {
    return apiAdmin.get(`/auth/api/v1/get-user-permission`,);
}
export {
    get_list_user, create_user, get_user, delete_user, edit_user, get_list_user_permission
}