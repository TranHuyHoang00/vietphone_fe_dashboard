import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListFlashSale = (dataFilter) => {
    return apiAdmin.get(`/promotion/api/v1/list-flash-sale?${getUrlApi(dataFilter)}`);
}
const createFlashSale = (data) => {
    return apiAdmin.post(`/promotion/api/v1/create-flash-sale`, data);
}
const getDataFlashSale = (id) => {
    return apiAdmin.get(`/promotion/api/v1/get-flash-sale/${id}`);
}
const deleteFlashSale = (id) => {
    return apiAdmin.delete(`/promotion/api/v1/delete-flash-sale/${id}`);
}
const editFlashSale = (id, data) => {
    return apiAdmin.put(`/promotion/api/v1/update-flash-sale/${id}`, data);
}
export {
    getListFlashSale, createFlashSale, getDataFlashSale, deleteFlashSale, editFlashSale
}