import api_admin from '../auths/api_admin';
const get_list_category = () => {
    return api_admin.get(`/auth/api/v1/list-category`,);
}
const create_category = (data) => {
    return api_admin.post(`/auth/api/v1/create-category`, data,);
}
const get_category = (id) => {
    return api_admin.get(`/auth/api/v1/get-category/${id}`,);
}
const delete_category = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-category/${id}`,);
}
const edit_category = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-category/${id}`, data,);
}
export {
    get_list_category, create_category, get_category, delete_category, edit_category
}