import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListRepair = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-repair-time?${getUrlApi(dataFilter)}`);
}
const createRepair = (data) => {
    return apiAdmin.post(`/product/api/v1/create-repair-time`, data);
}
const getDataRepair = (id) => {
    return apiAdmin.get(`/product/api/v1/get-repair-time/${id}`);
}
const deleteRepair = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-repair-time/${id}`);
}
const editRepair = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-repair-time/${id}`, data);
}
export {
    getListRepair, createRepair, getDataRepair, deleteRepair, editRepair
}