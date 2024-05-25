import api_admin from '@auths/api_admin';
const getListBrand = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-brand?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createBrand = (data) => {
    return api_admin.post(`/product/api/v1/create-brand`, data);
}
const getDataBrand = (id) => {
    return api_admin.get(`/product/api/v1/get-brand/${id}`);
}
const deleteBrand = (id) => {
    return api_admin.delete(`/product/api/v1/delete-brand/${id}`);
}
const editBrand = (id, data) => {
    return api_admin.put(`/product/api/v1/update-brand/${id}`, data);
}
export {
    getListBrand, createBrand, getDataBrand, deleteBrand, editBrand
}