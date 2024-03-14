import api_admin from '../auths/api_admin';
const get_list_staff = () => {
    return api_admin.get(`/auth/api/v1/list-staff`,);
}
const create_staff = (data) => {
    return api_admin.post(`/auth/api/v1/create-staff`, data,);
}
const get_staff = (id) => {
    return api_admin.get(`/auth/api/v1/get-staff/${id}`,);
}
const delete_staff = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-staff/${id}`,);
}
const edit_staff = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-staff/${id}`, data,);
}
export {
    get_list_staff, create_staff, get_staff, delete_staff, edit_staff
}