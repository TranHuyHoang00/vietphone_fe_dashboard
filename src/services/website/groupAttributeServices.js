import apiAdmin from '@auths/apiAdmin';
const getListGroupAttribute = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-group-attribute?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createGroupAttribute = (data) => {
    return apiAdmin.post(`/product/api/v1/create-group-attribute`, data);
}
const getDataGroupAttribute = (id) => {
    return apiAdmin.get(`/product/api/v1/get-group-attribute/${id}`);
}
const deleteGroupAttribute = (id) => {
    return apiAdmin.delete(`/product/api/v1/update-group-attribute/${id}`);
}
const editGroupAttribute = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-group-attribute/${id}`, data);
}
export {
    getListGroupAttribute, createGroupAttribute, getDataGroupAttribute, deleteGroupAttribute, editGroupAttribute
}