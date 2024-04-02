import api_admin from '../auths/api_admin';
const get_list_attribute = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-attribute?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search_query === null || date_filter.search_query === '') ? '' : `&search_query=${date_filter.search_query}`}`);
}
const create_attribute = (data) => {
    return api_admin.post(`/product/api/v1/create-attribute`, data);
}
const get_attribute = (id) => {
    return api_admin.get(`/product/api/v1/get-attribute/${id}`);
}
const delete_attribute = (id) => {
    return api_admin.delete(`/product/api/v1/delete-attribute/${id}`);
}
const edit_attribute = (id, data) => {
    return api_admin.put(`/product/api/v1/update-attribute/${id}`, data);
}
export {
    get_list_attribute, create_attribute, get_attribute, delete_attribute, edit_attribute
}