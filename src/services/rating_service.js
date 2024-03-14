import api_admin from '../auths/api_admin';
const get_list_rating = () => {
    return api_admin.get(`/auth/api/v1/list-rating`,);
}
const create_rating = (data) => {
    return api_admin.post(`/auth/api/v1/create-rating`, data,);
}
const get_rating = (id) => {
    return api_admin.get(`/auth/api/v1/get-rating/${id}`,);
}
const delete_rating = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-rating/${id}`,);
}
const edit_rating = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-rating/${id}`, data,);
}
export {
    get_list_rating, create_rating, get_rating, delete_rating, edit_rating
}