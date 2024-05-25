import apiAdmin from '@auths/apiAdmin';
const getListPost = (date_filter) => {
    return apiAdmin.get(`/bai-viet/api/v1/list-post?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createPost = (data) => {
    return apiAdmin.post(`/bai-viet/api/v1/create-post`, data);
}
const getDataPost = (id) => {
    return apiAdmin.get(`/bai-viet/api/v1/get-post/${id}`);
}
const deletePost = (id) => {
    return apiAdmin.delete(`/bai-viet/api/v1/delete-post/${id}`);
}
const editPost = (id, data) => {
    return apiAdmin.put(`/bai-viet/api/v1/update-post/${id}`, data);
}
export {
    getListPost, createPost, getDataPost, deletePost, editPost
}