import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListOrder = (dataFilter) => {
    return apiAdmin.get(`/order/api/v1/list-order?${getUrlApi(dataFilter)}`);
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