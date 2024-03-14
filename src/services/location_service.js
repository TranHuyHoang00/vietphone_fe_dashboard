import api_admin from '../auths/api_admin';
const get_list_location = () => {
    return api_admin.get(`/auth/api/v1/list-location`,);
}
const create_location = (data) => {
    return api_admin.post(`/auth/api/v1/create-location`, data,);
}
const get_location = (id) => {
    return api_admin.get(`/auth/api/v1/get-location/${id}`,);
}
const delete_location = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-location/${id}`,);
}
const edit_location = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-location/${id}`, data,);
}
export {
    get_list_location, create_location, get_location, delete_location, edit_location
}