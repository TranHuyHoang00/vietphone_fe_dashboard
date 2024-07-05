import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListTag = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-tag?${getUrlApi(dataFilter)}`);
}
const createTag = (data) => {
    return apiAdmin.post(`/product/api/v1/create-tag`, data);
}
const getDataTag = (id) => {
    return apiAdmin.get(`/product/api/v1/get-tag/${id}`);
}
const deleteTag = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-tag/${id}`);
}
const editTag = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-tag/${id}`, data);
}
export {
    getListTag, createTag, getDataTag, deleteTag, editTag
}