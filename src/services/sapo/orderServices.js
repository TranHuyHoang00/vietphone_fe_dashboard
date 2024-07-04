import apiAdmin from '@auths/apiAdmin';
const getListOrder = ({ page, limit, search, status, source }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const statusQuery = status ? `&status=${status}` : '';
    const sourceQuery = source ? `&status=${source}` : '';
    const url = `/order/api/v1/list-order?page=${page}&limit=${limit}${searchQuery}${statusQuery}${sourceQuery}`;
    return apiAdmin.get(url);
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