import api_admin from '../auths/api_admin';
const get_list_charge_of = () => {
    return api_admin.get(`/management/api/v1/list-charge_of`,);
}
const create_charge_of = (data) => {
    return api_admin.post(`/management/api/v1/create-charge_of`, data,);
}
const get_charge_of = (id) => {
    return api_admin.get(`/management/api/v1/get-charge_of/${id}`,);
}
const delete_charge_of = (id) => {
    return api_admin.delete(`/management/api/v1/delete-charge_of/${id}`,);
}
const edit_charge_of = (id, data) => {
    return api_admin.put(`/management/api/v1/update-charge_of/${id}`, data,);
}
export {
    get_list_charge_of, create_charge_of, get_charge_of, delete_charge_of, edit_charge_of
}