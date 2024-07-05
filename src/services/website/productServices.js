import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListProduct = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-product?${getUrlApi(dataFilter)}`);
}
const createProduct = (data) => {
    return apiAdmin.post(`/product/api/v1/create-product`, data);
}
const getDataProduct = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product/${id}`);
}
const deleteProduct = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-product/${id}`);
}
const editProduct = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product/${id}`, data);
}
export {
    getListProduct, createProduct, getDataProduct, deleteProduct, editProduct
}