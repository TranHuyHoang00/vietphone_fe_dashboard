import apiAdmin from '@auths/apiAdmin';
const getListGroupAttribute = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-group-attribute?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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