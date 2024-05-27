import apiAdmin from '@auths/apiAdmin';
const getListFlashSaleItem = (date_filter) => {
    return apiAdmin.get(`/promotion/api/v1/list-flash-sale-item?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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