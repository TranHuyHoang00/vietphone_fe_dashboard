import api_admin from '../auths/api_admin';
const get_list_media = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-product-media?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_media = (data) => {
    return api_admin.post(`/product/api/v1/create-product-media`, data);
}
const get_media = (id) => {
    return api_admin.get(`/product/api/v1/get-product-media/${id}`);
}
const delete_media = (id) => {
    return api_admin.delete(`/product/api/v1/delete-product-media/${id}`);
}
const edit_media = (id, data) => {
    return api_admin.put(`/product/api/v1/update-product-media/${id}`, data);
}
export {
    get_list_media, create_media, get_media, delete_media, edit_media
}