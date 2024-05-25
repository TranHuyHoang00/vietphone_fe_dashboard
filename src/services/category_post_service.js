import apiAdmin from '@auths/apiAdmin';
const getListCategoryPost = (date_filter) => {
    return apiAdmin.get(`/bai-viet/api/v1/list-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createCategoryPost = (data) => {
    return apiAdmin.post(`/bai-viet/api/v1/create-category`, data);
}
const getDataCategoryPost = (id) => {
    return apiAdmin.get(`/bai-viet/api/v1/get-category/${id}`);
}
const deleteCategoryPost = (id) => {
    return apiAdmin.delete(`/bai-viet/api/v1/delete-category/${id}`);
}
const editCategoryPost = (id, data) => {
    return apiAdmin.put(`/bai-viet/api/v1/update-category/${id}`, data);
}
export {
    getListCategoryPost, createCategoryPost, getDataCategoryPost, deleteCategoryPost, editCategoryPost
}