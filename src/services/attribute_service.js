import apiAdmin from '@auths/apiAdmin';
const getListAttribute = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-attribute?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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