import apiAdmin from '@auths/apiAdmin';
const getListTarget = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-target?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createTarget = (data) => {
    return apiAdmin.post(`/product/api/v1/create-target`, data);
}
const getDataTarget = (id) => {
    return apiAdmin.get(`/product/api/v1/get-target/${id}`);
}
const deleteTarget = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-target/${id}`);
}
const editTarget = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-target/${id}`, data);
}
export {
    getListTarget, createTarget, getDataTarget, deleteTarget, editTarget
}