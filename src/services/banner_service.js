import api_admin from '../auths/api_admin';
const get_list_banner = () => {
    return api_admin.get(`/auth/api/v1/list-banner`,);
}
const create_banner = (data) => {
    return api_admin.post(`/auth/api/v1/create-banner`, data,);
}
const get_banner = (id) => {
    return api_admin.get(`/auth/api/v1/get-banner/${id}`,);
}
const delete_banner = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-banner/${id}`,);
}
const edit_banner = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-banner/${id}`, data,);
}
export {
    get_list_banner, create_banner, get_banner, delete_banner, edit_banner
}