import api_admin from '../auths/api_admin';
const get_list_flash_sale = (date_filter) => {
    return api_admin.get(`/promotion/api/v1/list-flash-sale?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_flash_sale = (data) => {
    return api_admin.post(`/promotion/api/v1/create-flash-sale`, data);
}
const get_flash_sale = (id) => {
    return api_admin.get(`/promotion/api/v1/get-flash-sale/${id}`);
}
const delete_flash_sale = (id) => {
    return api_admin.delete(`/promotion/api/v1/delete-flash-sale/${id}`);
}
const edit_flash_sale = (id, data) => {
    return api_admin.put(`/promotion/api/v1/update-flash-sale/${id}`, data);
}
export {
    get_list_flash_sale, create_flash_sale, get_flash_sale, delete_flash_sale, edit_flash_sale
}