import api_admin from '../auths/api_admin';
const get_list_location = (date_filter) => {
    return api_admin.get(`/settings/api/v1/list-location?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_location = (data) => {
    return api_admin.post(`/settings/api/v1/create-location`, data);
}
const get_location = (id) => {
    return api_admin.get(`/settings/api/v1/get-location/${id}`);
}
const delete_location = (id) => {
    return api_admin.delete(`/settings/api/v1/update-location/${id}`);
}
const edit_location = (id, data) => {
    return api_admin.put(`/settings/api/v1/update-location/${id}`, data);
}
export {
    get_list_location, create_location, get_location, delete_location, edit_location
}