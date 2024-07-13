import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListProductCategoryTarget = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-sapo-target-product-category?${getUrlApi(dataFilter)}`);
}
const createProductCategoryTarget = (data) => {
    return apiAdmin.post(`/product/api/v1/create-sapo-target-product-category`, data);
}
const getDataProductCategoryTarget = (id) => {
    return apiAdmin.get(`/product/api/v1/get-sapo-target-product-category/${id}`);
}
const deleteProductCategoryTarget = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-sapo-target-product-category/${id}`);
}
const editProductCategoryTarget = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-sapo-target-product-category/${id}`, data);
}
export {
    getListProductCategoryTarget, createProductCategoryTarget, getDataProductCategoryTarget, deleteProductCategoryTarget, editProductCategoryTarget,
}