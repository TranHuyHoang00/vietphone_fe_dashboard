import api_admin from '@auths/api_admin';
const getListCategoryPost = (date_filter) => {
    return api_admin.get(`/bai-viet/api/v1/list-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createCategoryPost = (data) => {
    return api_admin.post(`/bai-viet/api/v1/create-category`, data);
}
const getDataCategoryPost = (id) => {
    return api_admin.get(`/bai-viet/api/v1/get-category/${id}`);
}
const deleteCategoryPost = (id) => {
    return api_admin.delete(`/bai-viet/api/v1/delete-category/${id}`);
}
const editCategoryPost = (id, data) => {
    return api_admin.put(`/bai-viet/api/v1/update-category/${id}`, data);
}
export {
    getListCategoryPost, createCategoryPost, getDataCategoryPost, deleteCategoryPost, editCategoryPost
}