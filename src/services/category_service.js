import apiAdmin from '@auths/apiAdmin';
const getListCategory = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createCategory = (data) => {
    return apiAdmin.post(`/product/api/v1/create-category`, data);
}
const getDataCategory = (id) => {
    return apiAdmin.get(`/product/api/v1/get-category/${id}`);
}
const deleteCategory = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-category/${id}`);
}
const editCategory = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-category/${id}`, data);
}
export {
    getListCategory, createCategory, getDataCategory, deleteCategory, editCategory
}