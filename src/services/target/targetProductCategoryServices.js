import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListTargetProductCategory = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-target-product-category?${getUrlApi(dataFilter)}`);
}
const createTargetProductCategory = (data) => {
    return apiAdmin.post(`/analytic/api/v1/create-target-product-category`, data);
}
const getDataTargetProductCategory = (id) => {
    return apiAdmin.get(`/analytic/api/v1/get-target-product-category/${id}`);
}
const deleteTargetProductCategory = (id) => {
    return apiAdmin.delete(`/analytic/api/v1/delete-target-product-category/${id}`);
}
const editTargetProductCategory = (id, data) => {
    return apiAdmin.put(`/analytic/api/v1/update-target-product-category/${id}`, data);
}
export {
    getListTargetProductCategory, createTargetProductCategory, getDataTargetProductCategory, deleteTargetProductCategory, editTargetProductCategory
}