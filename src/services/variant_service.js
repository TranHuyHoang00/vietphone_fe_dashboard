import apiAdmin from '@auths/apiAdmin';
const get_list_variant = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-product-variant?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_variant = (data) => {
    return apiAdmin.post(`/product/api/v1/create-variant`, data);
}
const get_variant = (id) => {
    return apiAdmin.get(`/product/api/v1/get-product-variant/${id}`);
}
const delete_variant = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-variant/${id}`);
}
const edit_variant = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-product-variant/${id}`, data);
}
export {
    get_list_variant, create_variant, get_variant, delete_variant, edit_variant
}