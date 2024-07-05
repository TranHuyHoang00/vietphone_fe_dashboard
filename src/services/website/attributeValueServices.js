import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListAttributeValue = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-attribute-value?${getUrlApi(dataFilter)}`);
}
const createAttributeValue = (data) => {
    return apiAdmin.post(`/product/api/v1/create-attribute-value`, data);
}
const getDataAttributeValue = (id) => {
    return apiAdmin.get(`/product/api/v1/update-attribute-value/${id}`);
}
const getAttributeValueDetail = (id) => {
    return apiAdmin.get(`/product/api/v1/get-attribute-value/${id}`);
}
const deleteAttributeValue = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-attribute-value/${id}`);
}
const editAttributeValue = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-attribute-value/${id}`, data);
}
export {
    getListAttributeValue, createAttributeValue, getDataAttributeValue, deleteAttributeValue, editAttributeValue,
    getAttributeValueDetail
}