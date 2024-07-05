import apiAdmin from '@auths/apiAdmin';
const getListProduct = ({ page, limit, search, product_brand, tag, category, is_active, has_page, source }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const productBrandQuery = product_brand ? `&product_brand=${product_brand}` : '';
    const tagQuery = tag ? `&tag=${tag}` : '';
    const categoryQuery = category ? `&category=${category}` : '';
    const isActiveQuery = is_active ? `&is_active=${is_active}` : '';
    const hasPageQuery = has_page ? `&has_page=${has_page}` : '';
    const sourceQuery = source ? `&source=${source}` : '';
    const url = `/product/api/v1/list-product?page=${page}&limit=${limit}${searchQuery}${productBrandQuery}${tagQuery}${categoryQuery}${isActiveQuery}${hasPageQuery}${sourceQuery}`;
    return apiAdmin.get(url);
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