import api_admin from '../auths/api_admin';
const get_list_role = () => {
    return api_admin.get(`/auth/api/v1/list-role`,);
}
const create_role = (data) => {
    return api_admin.post(`/auth/api/v1/create-role`, data,);
}
const get_role = (id) => {
    return api_admin.get(`/auth/api/v1/get-role/${id}`,);
}
const delete_role = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-role/${id}`,);
}
const edit_role = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-role/${id}`, data,);
}
export {
    get_list_role, create_role, get_role, delete_role, edit_role
}