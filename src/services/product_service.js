import apiAdmin from '@auths/apiAdmin';
const getListProduct = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-product?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}${date_filter.product_brand === '' ? '' : `&product_brand=${date_filter.product_brand}`}${date_filter.tag === '' ? '' : `&tag=${date_filter.tag}`}${date_filter.category === '' ? '' : `&category=${date_filter.category}`}${date_filter.is_active === '' ? '' : `&is_active=${date_filter.is_active}`}${date_filter.category === '' ? '' : `&category=${date_filter.category}`}${date_filter.has_page === '' ? '' : `&has_page=${date_filter.has_page}`}${date_filter.source === '' ? '' : `&source=${date_filter.source}`}`);
}
const createProduct = (data) => {
    return apiAdmin.post(`/product/api/v1/create-product`, data);
}
const getDataProduct = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product/${id}`);
}
const deleteProduct = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-product/${id}`);
}
const editProduct = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product/${id}`, data);
}
export {
    getListProduct, createProduct, getDataProduct, deleteProduct, editProduct
}