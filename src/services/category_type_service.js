import api_admin from '../auths/api_admin';
const get_list_category_type = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-category-type?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search_query === null || date_filter.search_query === '') ? '' : `&search_query=${date_filter.search_query}`}`);
}
const create_category_type = (data) => {
    return api_admin.post(`/product/api/v1/create-category-type`, data);
}
const get_category_type = (id) => {
    return api_admin.get(`/product/api/v1/get-category-type/${id}`);
}
const delete_category_type = (id) => {
    return api_admin.delete(`/product/api/v1/delete-category-type/${id}`);
}
const edit_category_type = (id, data) => {
    return api_admin.put(`/product/api/v1/update-category-type/${id}`, data);
}
export {
    get_list_category_type, create_category_type, get_category_type, delete_category_type, edit_category_type
}