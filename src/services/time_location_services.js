import api_admin from '../auths/api_admin';
const get_list_time_location = () => {
    return api_admin.get(`/management/api/v1/list-time_location`,);
}
const create_time_location = (data) => {
    return api_admin.post(`/management/api/v1/create-time_location`, data,);
}
const get_time_location = (id) => {
    return api_admin.get(`/management/api/v1/get-time_location/${id}`,);
}
const delete_time_location = (id) => {
    return api_admin.delete(`/management/api/v1/delete-time_location/${id}`,);
}
const edit_time_location = (id, data) => {
    return api_admin.put(`/management/api/v1/update-time_location/${id}`, data,);
}
export {
    get_list_time_location, create_time_location, get_time_location, delete_time_location, edit_time_location
}