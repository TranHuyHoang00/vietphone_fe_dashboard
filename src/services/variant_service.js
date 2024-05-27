import apiAdmin from '@auths/apiAdmin';
const getListVariant = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-product-variant?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createVariant = (data) => {
    return apiAdmin.post(`/product/api/v1/create-variant`, data);
}
const getDataVariant = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product-variant/${id}`);
}
const deleteVariant = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-variant/${id}`);
}
const editVariant = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product-variant/${id}`, data);
}
export {
    getListVariant, createVariant, getDataVariant, deleteVariant, editVariant
}