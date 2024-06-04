import apiAdmin from '@auths/apiAdmin';
const getListRepair = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-repair-time?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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