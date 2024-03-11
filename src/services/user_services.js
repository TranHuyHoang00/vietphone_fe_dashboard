import api_admin from '../auths/api_admin';
const get_list_user = () => {
    return api_admin.get(`/auth/api/v1/list-user`,);
}
const create_user = (data) => {
    return api_admin.post(`/auth/api/v1/create-user`, data,);
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
export {
    get_list_user, create_user, get_user, delete_user, edit_user
}