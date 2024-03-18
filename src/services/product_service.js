import api_admin from '../auths/api_admin';
const get_list_product = (date_filter) => {
    return api_admin.get(`/account/api/v1/list-product?page=${date_filter.page}&limit=${date_filter.limit}&search_query=${date_filter.search_query}`,);
}
const create_product = (data) => {
    return api_admin.post(`/auth/api/v1/create-product`, data,);
}
const get_product = (id) => {
    return api_admin.get(`/account/api/v1/product/${id}`,);
}
const delete_product = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-product/${id}`,);
}
const edit_product = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-product/${id}`, data,);
}
export {
    get_list_product, create_product, get_product, delete_product, edit_product
}