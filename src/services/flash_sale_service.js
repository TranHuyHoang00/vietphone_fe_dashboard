import apiAdmin from '@auths/apiAdmin';
const getListFlashSale = (date_filter) => {
    return apiAdmin.get(`/promotion/api/v1/list-flash-sale?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createFlashSale = (data) => {
    return apiAdmin.post(`/promotion/api/v1/create-flash-sale`, data);
}
const getDataFlashSale = (id) => {
    return apiAdmin.get(`/promotion/api/v1/get-flash-sale/${id}`);
}
const deleteFlashSale = (id) => {
    return apiAdmin.delete(`/promotion/api/v1/delete-flash-sale/${id}`);
}
const editFlashSale = (id, data) => {
    return apiAdmin.put(`/promotion/api/v1/update-flash-sale/${id}`, data);
}
export {
    getListFlashSale, createFlashSale, getDataFlashSale, deleteFlashSale, editFlashSale
}