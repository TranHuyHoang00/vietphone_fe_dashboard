import api_admin from '../auths/api_admin';
const get_list_brand = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-brand?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search_query == null || date_filter.search_query == '') ? '' : `&search_query=${date_filter.search_query}`}`);
}
const create_brand = (data) => {
    return api_admin.post(`/product/api/v1/create-brand`, data);
}
const get_brand = (id) => {
    return api_admin.get(`/product/api/v1/brand/${id}`);
}
const delete_brand = (id) => {
    return api_admin.delete(`/product/api/v1/brand/${id}`);
}
const edit_brand = (id, data) => {
    return api_admin.put(`/product/api/v1/brand/${id}`, data);
}
export {
    get_list_brand, create_brand, get_brand, delete_brand, edit_brand
}