import api_admin from '@auths/api_admin';
const get_list_category = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_category = (data) => {
    return api_admin.post(`/product/api/v1/create-category`, data);
}
const get_category = (id) => {
    return api_admin.get(`/product/api/v1/get-category/${id}`);
}
const delete_category = (id) => {
    return api_admin.delete(`/product/api/v1/delete-category/${id}`);
}
const edit_category = (id, data) => {
    return api_admin.put(`/product/api/v1/update-category/${id}`, data);
}
export {
    get_list_category, create_category, get_category, delete_category, edit_category
}