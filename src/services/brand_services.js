import api_admin from '../auths/api_admin';
const get_list_brand = () => {
    return api_admin.get(`/management/api/v1/list-brand`,);
}
const create_brand = (data) => {
    return api_admin.post(`/management/api/v1/create-brand`, data,);
}
const get_brand = (id) => {
    return api_admin.get(`/management/api/v1/get-brand/${id}`,);
}
const delete_brand = (id) => {
    return api_admin.delete(`/management/api/v1/delete-brand/${id}`,);
}
const edit_brand = (id, data) => {
    return api_admin.put(`/management/api/v1/update-brand/${id}`, data,);
}
export {
    get_list_brand, create_brand, get_brand, delete_brand, edit_brand
}