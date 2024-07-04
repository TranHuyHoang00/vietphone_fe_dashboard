import apiAdmin from '@auths/apiAdmin';
const getListAttributeValue = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-attribute-value?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createAttributeValue = (data) => {
    return apiAdmin.post(`/product/api/v1/create-attribute-value`, data);
}
const getDataAttributeValue = (id) => {
    return apiAdmin.get(`/product/api/v1/update-attribute-value/${id}`);
}
const getAttributeValueDetail = (id) => {
    return apiAdmin.get(`/product/api/v1/get-attribute-value/${id}`);
}
const deleteAttributeValue = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-attribute-value/${id}`);
}
const editAttributeValue = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-attribute-value/${id}`, data);
}
export {
    getListAttributeValue, createAttributeValue, getDataAttributeValue, deleteAttributeValue, editAttributeValue,
    getAttributeValueDetail
}