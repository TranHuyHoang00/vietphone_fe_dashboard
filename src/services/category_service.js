import api_admin from '@auths/api_admin';
const getListCategory = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createCategory = (data) => {
    return api_admin.post(`/product/api/v1/create-category`, data);
}
const getDataCategory = (id) => {
    return api_admin.get(`/product/api/v1/get-category/${id}`);
}
const deleteCategory = (id) => {
    return api_admin.delete(`/product/api/v1/delete-category/${id}`);
}
const editCategory = (id, data) => {
    return api_admin.put(`/product/api/v1/update-category/${id}`, data);
}
export {
    getListCategory, createCategory, getDataCategory, deleteCategory, editCategory
}