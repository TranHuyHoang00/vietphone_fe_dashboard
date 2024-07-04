import apiAdmin from '@auths/apiAdmin';
const getListCategoryPost = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/bai-viet/api/v1/list-category?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
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