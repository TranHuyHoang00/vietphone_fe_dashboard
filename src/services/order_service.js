import apiAdmin from '@auths/apiAdmin';
const get_list_order = (date_filter) => {
    return apiAdmin.get(`/order/api/v1/list-order?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.status === '' ? '' : `&status=${date_filter.status}`}${date_filter.source === '' ? '' : `&source=${date_filter.source}`}`);
}
const create_order = (data) => {
    return apiAdmin.post(`/auth/api/v1/create-order`, data,);
}
const get_order = (id) => {
    return apiAdmin.get(`/order/api/v1/get-order/${id}`);
}
const delete_order = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-order/${id}`,);
}
const edit_order = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-order/${id}`, data,);
}
export {
    get_list_order, create_order, get_order, delete_order, edit_order
}