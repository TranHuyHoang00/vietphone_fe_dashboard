import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListAttribute = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-attribute?${getUrlApi(dataFilter)}`);
}
const createAttribute = (data) => {
    return apiAdmin.post(`/product/api/v1/create-attribute`, data);
}
const getDataAttribute = (id) => {
    return apiAdmin.get(`/product/api/v1/get-attribute/${id}`);
}
const deleteAttribute = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-attribute/${id}`);
}
const editAttribute = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-attribute/${id}`, data);
}
export {
    getListAttribute, createAttribute, getDataAttribute, deleteAttribute, editAttribute
}