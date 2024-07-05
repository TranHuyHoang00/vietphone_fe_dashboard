import apiAdmin from '@auths/apiAdmin';
const getListMedia = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-product-media?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createMedia = (data) => {
    return apiAdmin.post(`/product/api/v1/create-product-media`, data);
}
const getDataMedia = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product-media/${id}`);
}
const deleteMedia = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-product-media/${id}`);
}
const editMedia = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product-media/${id}`, data);
}
export {
    getListMedia, createMedia, getDataMedia, deleteMedia, editMedia
}