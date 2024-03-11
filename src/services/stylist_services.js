import api_admin from '../auths/api_admin';
const get_list_stylist = () => {
    return api_admin.get(`/management/api/v1/list-stylist`,);
}
const create_stylist = (data) => {
    return api_admin.post(`/management/api/v1/create-stylist`, data,);
}
const get_stylist = (id) => {
    return api_admin.get(`/management/api/v1/get-stylist/${id}`,);
}
const delete_stylist = (id) => {
    return api_admin.delete(`/management/api/v1/delete-stylist/${id}`,);
}
const edit_stylist = (id, data) => {
    return api_admin.put(`/management/api/v1/update-stylist/${id}`, data,);
}
export {
    get_list_stylist, create_stylist, get_stylist, delete_stylist, edit_stylist
}