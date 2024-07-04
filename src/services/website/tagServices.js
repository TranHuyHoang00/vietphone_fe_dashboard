import apiAdmin from '@auths/apiAdmin';
const getListTag = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-tag?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createTag = (data) => {
    return apiAdmin.post(`/product/api/v1/create-tag`, data);
}
const getDataTag = (id) => {
    return apiAdmin.get(`/product/api/v1/get-tag/${id}`);
}
const deleteTag = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-tag/${id}`);
}
const editTag = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-tag/${id}`, data);
}
export {
    getListTag, createTag, getDataTag, deleteTag, editTag
}