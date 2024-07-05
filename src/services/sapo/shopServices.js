import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListShop = (dataFilter) => {
    return apiAdmin.get(`/shop/api/v1/list-shop?${getUrlApi(dataFilter)}`);
}
const createShop = (data) => {
    return apiAdmin.post(`/shop/api/v1/create-shop`, data);
}
const getDataShop = (id) => {
    return apiAdmin.get(`/shop/api/v1/get-shop/${id}`);
}
const deleteShop = (id) => {
    return apiAdmin.delete(`/shop/api/v1/delete-shop/${id}`);
}
const editShop = (id, data) => {
    return apiAdmin.put(`/shop/api/v1/update-shop/${id}`, data);
}
export {
    getListShop, createShop, getDataShop, deleteShop, editShop
}