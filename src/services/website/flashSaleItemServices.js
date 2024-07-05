import apiAdmin from '@auths/apiAdmin';
const getListFlashSaleItem = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/promotion/api/v1/list-flash-sale-item?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createFlashSaleItem = (data) => {
    return apiAdmin.post(`/promotion/api/v1/create-flash-sale-item`, data);
}
const getDataFlashSaleItem = (id) => {
    return apiAdmin.get(`/promotion/api/v1/get-flash-sale-item/${id}`);
}
const deleteFlashSaleItem = (id) => {
    return apiAdmin.delete(`/promotion/api/v1/delete-flash-sale-item/${id}`);
}
const editFlashSaleItem = (id, data) => {
    return apiAdmin.put(`/promotion/api/v1/update-flash-sale-item/${id}`, data);
}
export {
    getListFlashSaleItem, createFlashSaleItem, getDataFlashSaleItem, deleteFlashSaleItem, editFlashSaleItem
}