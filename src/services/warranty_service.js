import apiAdmin from '@auths/apiAdmin';
const getListWarranty = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-warranty?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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