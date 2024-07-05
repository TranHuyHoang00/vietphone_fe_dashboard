import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListCategory = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-category?${getUrlApi(dataFilter)}`);
}
const createCategory = (data) => {
    return apiAdmin.post(`/product/api/v1/create-category`, data);
}
const getDataCategory = (id) => {
    return apiAdmin.get(`/product/api/v1/get-category/${id}`);
}
const deleteCategory = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-category/${id}`);
}
const editCategory = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-category/${id}`, data);
}
export {
    getListCategory, createCategory, getDataCategory, deleteCategory, editCategory
}