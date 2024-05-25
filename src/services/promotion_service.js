import apiAdmin from '@auths/apiAdmin';
const get_list_promotion = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-promotion?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_promotion = (data) => {
    return apiAdmin.post(`/product/api/v1/create-promotion`, data);
}
const get_promotion = (id) => {
    return apiAdmin.get(`/product/api/v1/get-promotion/${id}`);
}
const delete_promotion = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-promotion/${id}`);
}
const edit_promotion = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-promotion/${id}`, data);
}
export {
    get_list_promotion, create_promotion, get_promotion, delete_promotion, edit_promotion
}