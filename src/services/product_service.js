import api_admin from '../auths/api_admin';
const get_list_product = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-product?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.product_brand === '' ? '' : `&product_brand=${date_filter.product_brand}`}${date_filter.tag === '' ? '' : `&tag=${date_filter.tag}`}${date_filter.category === '' ? '' : `&category=${date_filter.category}`}${date_filter.is_active === '' ? '' : `&is_active=${date_filter.is_active}`}${date_filter.category === '' ? '' : `&category=${date_filter.category}`}`);
}
const create_product = (data) => {
    return api_admin.post(`/product/api/v1/create-product`, data);
}
const get_product = (id) => {
    return api_admin.get(`/product/api/v1/get-product/${id}`);
}
const delete_product = (id) => {
    return api_admin.delete(`/product/api/v1/delete-product/${id}`);
}
const edit_product = (id, data) => {
    return api_admin.put(`/product/api/v1/update-product/${id}`, data);
}
export {
    get_list_product, create_product, get_product, delete_product, edit_product
}