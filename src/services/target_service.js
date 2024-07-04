import apiAdmin from '@auths/apiAdmin';
const getListTarget = (date_filter) => {
    return apiAdmin.get(`/analytic/api/v1/list-target-product-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createTarget = (data) => {
    return apiAdmin.post(`/analytic/api/v1/create-target-product-category`, data);
}
const getDataTarget = (id) => {
    return apiAdmin.get(`/analytic/api/v1/get-target-product-category/${id}`);
}
const deleteTarget = (id) => {
    return apiAdmin.delete(`/analytic/api/v1/delete-target-product-category/${id}`);
}
const editTarget = (id, data) => {
    return apiAdmin.put(`/analytic/api/v1/update-target-product-category/${id}`, data);
}
export {
    getListTarget, createTarget, getDataTarget, deleteTarget, editTarget
}