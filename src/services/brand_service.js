import apiAdmin from '@auths/apiAdmin';
const getListBrand = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-brand?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createBrand = (data) => {
    return apiAdmin.post(`/product/api/v1/create-brand`, data);
}
const getDataBrand = (id) => {
    return apiAdmin.get(`/product/api/v1/get-brand/${id}`);
}
const deleteBrand = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-brand/${id}`);
}
const editBrand = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-brand/${id}`, data);
}
export {
    getListBrand, createBrand, getDataBrand, deleteBrand, editBrand
}