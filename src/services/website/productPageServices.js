import apiAdmin from '@auths/apiAdmin';
const getListProductPage = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/api/v1/list-product-page?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createProductPage = (data) => {
    return apiAdmin.post(`/api/v1/create-product-page`, data);
}
const getDataProductPage = (id) => {
    return apiAdmin.get(`/api/v1/get-product-page/${id}`);
}
const deleteProductPage = (id) => {
    return apiAdmin.delete(`/api/v1/delete-product-page/${id}`);
}
const editProductPage = (id, data) => {
    return apiAdmin.put(`/api/v1/update-product-page/${id}`, data);
}
export {
    getListProductPage, createProductPage, getDataProductPage, deleteProductPage, editProductPage
}