import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListVariant = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-product-variant?${getUrlApi(dataFilter)}`);
}
const createVariant = (data) => {
    return apiAdmin.post(`/product/api/v1/create-product-variant`, data);
}
const getDataVariant = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product-variant/${id}`);
}
const deleteVariant = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-product-variant/${id}`);
}
const editVariant = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product-variant/${id}`, data);
}
export {
    getListVariant, createVariant, getDataVariant, deleteVariant, editVariant
}