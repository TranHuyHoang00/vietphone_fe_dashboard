import apiAdmin from '@auths/apiAdmin';
const getListTag = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-tag?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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