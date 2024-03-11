import api_admin from '../auths/api_admin';
const get_list_makeup_hair = () => {
    return api_admin.get(`/management/api/v1/list-makeup_hair`,);
}
const create_makeup_hair = (data) => {
    return api_admin.post(`/management/api/v1/create-makeup_hair`, data,);
}
const get_makeup_hair = (id) => {
    return api_admin.get(`/management/api/v1/get-makeup_hair/${id}`,);
}
const delete_makeup_hair = (id) => {
    return api_admin.delete(`/management/api/v1/delete-makeup_hair/${id}`,);
}
const edit_makeup_hair = (id, data) => {
    return api_admin.put(`/management/api/v1/update-makeup_hair/${id}`, data,);
}
export {
    get_list_makeup_hair, create_makeup_hair, get_makeup_hair, delete_makeup_hair, edit_makeup_hair
}