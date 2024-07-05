import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListProductCategory = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-sapo-product-category?${getUrlApi(dataFilter)}`);
}
const createProductCategory = (data) => {
    return apiAdmin.post(`/product/api/v1/create-sapo-product-category`, data);
}
const getDataProductCategory = (id) => {
    return apiAdmin.get(`/product/api/v1/get-sapo-product-category/${id}`);
}
const deleteProductCategory = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-sapo-product-category/${id}`);
}
const editProductCategory = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-sapo-product-category/${id}`, data);
}
export {
    getListProductCategory, createProductCategory, getDataProductCategory, deleteProductCategory, editProductCategory,
}