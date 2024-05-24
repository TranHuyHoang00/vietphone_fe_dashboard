import api_admin from '@auths/api_admin';
const getListTag = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-tag?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createTag = (data) => {
    return api_admin.post(`/product/api/v1/create-tag`, data);
}
const getDataTag = (id) => {
    return api_admin.get(`/product/api/v1/get-tag/${id}`);
}
const delete_tag = (id) => {
    return api_admin.delete(`/product/api/v1/delete-tag/${id}`);
}
const editTag = (id, data) => {
    return api_admin.put(`/product/api/v1/update-tag/${id}`, data);
}
export {
    getListTag, createTag, getDataTag, delete_tag, editTag
}