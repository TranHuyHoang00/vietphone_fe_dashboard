import api_admin from '@auths/api_admin';
const getListPost = (date_filter) => {
    return api_admin.get(`/bai-viet/api/v1/list-post?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createPost = (data) => {
    return api_admin.post(`/bai-viet/api/v1/create-post`, data);
}
const getDataPost = (id) => {
    return api_admin.get(`/bai-viet/api/v1/get-post/${id}`);
}
const deletePost = (id) => {
    return api_admin.delete(`/bai-viet/api/v1/delete-post/${id}`);
}
const editPost = (id, data) => {
    return api_admin.put(`/bai-viet/api/v1/update-post/${id}`, data);
}
export {
    getListPost, createPost, getDataPost, deletePost, editPost
}