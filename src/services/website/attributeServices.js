import apiAdmin from '@auths/apiAdmin';
const getListAttribute = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-attribute?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createAttribute = (data) => {
    return apiAdmin.post(`/product/api/v1/create-attribute`, data);
}
const getDataAttribute = (id) => {
    return apiAdmin.get(`/product/api/v1/get-attribute/${id}`);
}
const deleteAttribute = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-attribute/${id}`);
}
const editAttribute = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-attribute/${id}`, data);
}
export {
    getListAttribute, createAttribute, getDataAttribute, deleteAttribute, editAttribute
}