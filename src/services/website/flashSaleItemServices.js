import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListFlashSaleItem = (dataFilter) => {
    return apiAdmin.get(`/promotion/api/v1/list-flash-sale-item?${getUrlApi(dataFilter)}`);
}
const createFlashSaleItem = (data) => {
    return apiAdmin.post(`/promotion/api/v1/create-flash-sale-item`, data);
}
const getDataFlashSaleItem = (id) => {
    return apiAdmin.get(`/promotion/api/v1/get-flash-sale-item/${id}`);
}
const deleteFlashSaleItem = (id) => {
    return apiAdmin.delete(`/promotion/api/v1/delete-flash-sale-item/${id}`);
}
const editFlashSaleItem = (id, data) => {
    return apiAdmin.put(`/promotion/api/v1/update-flash-sale-item/${id}`, data);
}
export {
    getListFlashSaleItem, createFlashSaleItem, getDataFlashSaleItem, deleteFlashSaleItem, editFlashSaleItem
}