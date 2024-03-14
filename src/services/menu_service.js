import api_admin from '../auths/api_admin';
const get_list_menu = () => {
    return api_admin.get(`/auth/api/v1/list-menu`,);
}
const create_menu = (data) => {
    return api_admin.post(`/auth/api/v1/create-menu`, data,);
}
const get_menu = (id) => {
    return api_admin.get(`/auth/api/v1/get-menu/${id}`,);
}
const delete_menu = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-menu/${id}`,);
}
const edit_menu = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-menu/${id}`, data,);
}
export {
    get_list_menu, create_menu, get_menu, delete_menu, edit_menu
}