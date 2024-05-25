import apiAdmin from '@auths/apiAdmin';
const getListOrder = (date_filter) => {
    return apiAdmin.get(`/order/api/v1/list-order?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.status === '' ? '' : `&status=${date_filter.status}`}${date_filter.source === '' ? '' : `&source=${date_filter.source}`}`);
}
const createOrder = (data) => {
    return apiAdmin.post(`/auth/api/v1/create-order`, data,);
}
const getDataOrder = (id) => {
    return apiAdmin.get(`/order/api/v1/get-order/${id}`);
}
const deleteOrder = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-order/${id}`,);
}
const editOrder = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-order/${id}`, data,);
}
export {
    getListOrder, createOrder, getDataOrder, deleteOrder, editOrder
}