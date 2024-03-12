import api_admin from '../auths/api_admin';
const get_list_category_type = () => {
    return api_admin.get(`/auth/api/v1/list-category_type`,);
}
const create_category_type = (data) => {
    return api_admin.post(`/auth/api/v1/create-category_type`, data,);
}
const get_category_type = (id) => {
    return api_admin.get(`/auth/api/v1/get-category_type/${id}`,);
}
const delete_category_type = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-category_type/${id}`,);
}
const edit_category_type = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-category_type/${id}`, data,);
}
export {
    get_list_category_type, create_category_type, get_category_type, delete_category_type, edit_category_type
}