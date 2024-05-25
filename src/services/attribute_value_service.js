import apiAdmin from '@auths/apiAdmin';
const getListAttributeValue = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-attribute-value?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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