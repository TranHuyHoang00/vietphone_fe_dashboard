import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListGroupAttribute = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-group-attribute?${getUrlApi(dataFilter)}`);
}
const createGroupAttribute = (data) => {
    return apiAdmin.post(`/product/api/v1/create-group-attribute`, data);
}
const getDataGroupAttribute = (id) => {
    return apiAdmin.get(`/product/api/v1/get-group-attribute/${id}`);
}
const deleteGroupAttribute = (id) => {
    return apiAdmin.delete(`/product/api/v1/update-group-attribute/${id}`);
}
const editGroupAttribute = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-group-attribute/${id}`, data);
}
export {
    getListGroupAttribute, createGroupAttribute, getDataGroupAttribute, deleteGroupAttribute, editGroupAttribute
}