import api_admin from '../auths/api_admin';
const get_list_tag = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-tag?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search_query === null || date_filter.search_query === '') ? '' : `&search_query=${date_filter.search_query}`}`);
}
const create_tag = (data) => {
    return api_admin.post(`/product/api/v1/create-tag`, data);
}
const get_tag = (id) => {
    return api_admin.get(`/product/api/v1/get-tag/${id}`);
}
const delete_tag = (id) => {
    return api_admin.delete(`/product/api/v1/delete-tag/${id}`);
}
const edit_tag = (id, data) => {
    return api_admin.put(`/product/api/v1/update-tag/${id}`, data);
}
export {
    get_list_tag, create_tag, get_tag, delete_tag, edit_tag
}