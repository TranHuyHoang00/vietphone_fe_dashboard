import apiAdmin from '@auths/apiAdmin';
const getListProductCategory = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-sapo-product-category?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createProductCategory = (data) => {
    return apiAdmin.post(`/product/api/v1/create-sapo-product-category`, data);
}
const getDataProductCategory = (id) => {
    return apiAdmin.get(`/product/api/v1/get-sapo-product-category/${id}`);
}
const deleteProductCategory = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-sapo-product-category/${id}`);
}
const editProductCategory = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-sapo-product-category/${id}`, data);
}
export {
    getListProductCategory, createProductCategory, getDataProductCategory, deleteProductCategory, editProductCategory,
}