import apiAdmin from '@auths/apiAdmin';
const getListProductPage = (date_filter) => {
    return apiAdmin.get(`/api/v1/list-product-page?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createProductPage = (data) => {
    return apiAdmin.post(`/api/v1/create-product-page`, data);
}
const getDataProductPage = (id) => {
    return apiAdmin.get(`/api/v1/get-product-page/${id}`);
}
const deleteProductPage = (id) => {
    return apiAdmin.delete(`/api/v1/delete-product-page/${id}`);
}
const editProductPage = (id, data) => {
    return apiAdmin.put(`/api/v1/update-product-page/${id}`, data);
}
export {
    getListProductPage, createProductPage, getDataProductPage, deleteProductPage, editProductPage
}