import apiAdmin from '@auths/apiAdmin';
const get_list_product = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-product?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.product_brand === '' ? '' : `&product_brand=${date_filter.product_brand}`}${date_filter.tag === '' ? '' : `&tag=${date_filter.tag}`}${date_filter.category === '' ? '' : `&category=${date_filter.category}`}${date_filter.is_active === '' ? '' : `&is_active=${date_filter.is_active}`}${date_filter.category === '' ? '' : `&category=${date_filter.category}`}${date_filter.has_page === '' ? '' : `&has_page=${date_filter.has_page}`}`);
}
const create_product = (data) => {
    return apiAdmin.post(`/product/api/v1/create-product`, data);
}
const get_product = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product/${id}`);
}
const delete_product = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-product/${id}`);
}
const edit_product = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product/${id}`, data);
}
export {
    get_list_product, create_product, get_product, delete_product, edit_product
}