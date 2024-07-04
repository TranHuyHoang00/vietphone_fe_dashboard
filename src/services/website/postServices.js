import apiAdmin from '@auths/apiAdmin';
const getListPost = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/bai-viet/api/v1/list-post?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
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