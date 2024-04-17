import api_admin from '../auths/api_admin';
const get_list_product_page = (date_filter) => {
    return api_admin.get(`/api/v1/list-product-page?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_product_page = (data) => {
    return api_admin.post(`/api/v1/create-product-page`, data);
}
const get_product_page = (id) => {
    return api_admin.get(`/api/v1/get-product-page/${id}`);
}
const delete_product_page = (id) => {
    return api_admin.delete(`/api/v1/delete-product-page/${id}`);
}
const edit_product_page = (id, data) => {
    return api_admin.put(`/api/v1/update-product-page/${id}`, data);
}
export {
    get_list_product_page, create_product_page, get_product_page, delete_product_page, edit_product_page
}