import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListCategoryPost = (dataFilter) => {
    return apiAdmin.get(`/bai-viet/api/v1/list-category?${getUrlApi(dataFilter)}`);
}
const createCategoryPost = (data) => {
    return apiAdmin.post(`/bai-viet/api/v1/create-category`, data);
}
const getDataCategoryPost = (id) => {
    return apiAdmin.get(`/bai-viet/api/v1/get-category/${id}`);
}
const deleteCategoryPost = (id) => {
    return apiAdmin.delete(`/bai-viet/api/v1/delete-category/${id}`);
}
const editCategoryPost = (id, data) => {
    return apiAdmin.put(`/bai-viet/api/v1/update-category/${id}`, data);
}
export {
    getListCategoryPost, createCategoryPost, getDataCategoryPost, deleteCategoryPost, editCategoryPost
}