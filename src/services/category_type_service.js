import apiAdmin from '@auths/apiAdmin';
const get_list_category_type = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-category-type?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_category_type = (data) => {
    return apiAdmin.post(`/product/api/v1/create-category-type`, data);
}
const get_category_type = (id) => {
    return apiAdmin.get(`/product/api/v1/get-category-type/${id}`);
}
const delete_category_type = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-category-type/${id}`);
}
const edit_category_type = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-category-type/${id}`, data);
}
export {
    get_list_category_type, create_category_type, get_category_type, delete_category_type, edit_category_type
}