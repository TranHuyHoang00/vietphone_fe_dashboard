import apiAdmin from '@auths/apiAdmin';
const get_list_flash_sale_item = (date_filter) => {
    return apiAdmin.get(`/promotion/api/v1/list-flash-sale-item?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_flash_sale_item = (data) => {
    return apiAdmin.post(`/promotion/api/v1/create-flash-sale-item`, data);
}
const getDataFlashSaleItem = (id) => {
    return apiAdmin.get(`/promotion/api/v1/get-flash-sale-item/${id}`);
}
const delete_flash_sale_item = (id) => {
    return apiAdmin.delete(`/promotion/api/v1/delete-flash-sale-item/${id}`);
}
const editFlashSaleItem = (id, data) => {
    return apiAdmin.put(`/promotion/api/v1/update-flash-sale-item/${id}`, data);
}
export {
    get_list_flash_sale_item, create_flash_sale_item, getDataFlashSaleItem, delete_flash_sale_item, editFlashSaleItem
}