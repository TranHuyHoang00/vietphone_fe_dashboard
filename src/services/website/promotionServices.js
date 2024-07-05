import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListPromotion = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-promotion-info?${getUrlApi(dataFilter)}`);
}
const createPromotion = (data) => {
    return apiAdmin.post(`/product/api/v1/create-promotion-info`, data);
}
const getDataPromotion = (id) => {
    return apiAdmin.get(`/product/api/v1/get-promotion-info/${id}`);
}
const deletePromotion = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-promotion-info/${id}`);
}
const editPromotion = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-promotion-info/${id}`, data);
}
export {
    getListPromotion, createPromotion, getDataPromotion, deletePromotion, editPromotion
}