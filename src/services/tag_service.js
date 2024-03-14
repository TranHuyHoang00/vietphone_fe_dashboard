import api_admin from '../auths/api_admin';
const get_list_tag = () => {
    return api_admin.get(`/auth/api/v1/list-tag`,);
}
const create_tag = (data) => {
    return api_admin.post(`/auth/api/v1/create-tag`, data,);
}
const get_tag = (id) => {
    return api_admin.get(`/auth/api/v1/get-tag/${id}`,);
}
const delete_tag = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-tag/${id}`,);
}
const edit_tag = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-tag/${id}`, data,);
}
export {
    get_list_tag, create_tag, get_tag, delete_tag, edit_tag
}