import apiAdmin from '@auths/apiAdmin';
const getListUser = (date_filter) => {
    return apiAdmin.get(`/auth/api/v1/list-user?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.is_active === '' ? '' : `&is_active=${date_filter.is_active}`}${date_filter.is_superuser === '' ? '' : `&is_superuser=${date_filter.is_superuser}`}${date_filter.groups === '' ? '' : `&groups=${date_filter.groups}`}`);
}
const createUser = (data) => {
    return apiAdmin.post(`/auth/api/v1/register`, data,);
}
const getDataUser = (id) => {
    return apiAdmin.get(`/auth/api/v1/get-user/${id}`,);
}
const deleteUser = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-user/${id}`,);
}
const editUser = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-user/${id}`, data,);
}
const getListUserPermission = () => {
    return apiAdmin.get(`/auth/api/v1/get-user-permission`,);
}
export {
    getListUser, createUser, getDataUser, deleteUser, editUser, getListUserPermission
}