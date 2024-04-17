import api_admin from '../auths/api_admin';
const get_list_flash_sale_item = (date_filter) => {
    return api_admin.get(`/promotion/api/v1/list-flash-sale-item?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_flash_sale_item = (data) => {
    return api_admin.post(`/promotion/api/v1/create-flash-sale-item`, data);
}
const get_flash_sale_item = (id) => {
    return api_admin.get(`/promotion/api/v1/get-flash-sale-item/${id}`);
}
const delete_flash_sale_item = (id) => {
    return api_admin.delete(`/promotion/api/v1/delete-flash-sale-item/${id}`);
}
const edit_flash_sale_item = (id, data) => {
    return api_admin.put(`/promotion/api/v1/update-flash-sale-item/${id}`, data);
}
export {
    get_list_flash_sale_item, create_flash_sale_item, get_flash_sale_item, delete_flash_sale_item, edit_flash_sale_item
}