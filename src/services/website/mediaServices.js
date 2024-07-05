import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListMedia = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-product-media?${getUrlApi(dataFilter)}`);
}
const createMedia = (data) => {
    return apiAdmin.post(`/product/api/v1/create-product-media`, data);
}
const getDataMedia = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product-media/${id}`);
}
const deleteMedia = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-product-media/${id}`);
}
const editMedia = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product-media/${id}`, data);
}
export {
    getListMedia, createMedia, getDataMedia, deleteMedia, editMedia
}