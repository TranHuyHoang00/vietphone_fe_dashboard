import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListWarranty = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-warranty?${getUrlApi(dataFilter)}`);
}
const createWarranty = (data) => {
    return apiAdmin.post(`/product/api/v1/create-warranty`, data);
}
const getDataWarranty = (id) => {
    return apiAdmin.get(`/product/api/v1/get-warranty/${id}`);
}
const deleteWarranty = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-warranty/${id}`);
}
const editWarranty = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-warranty/${id}`, data);
}
export {
    getListWarranty, createWarranty, getDataWarranty, deleteWarranty, editWarranty
}