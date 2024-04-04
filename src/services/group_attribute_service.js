import api_admin from '../auths/api_admin';
const get_list_group_attribute = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-group-attribute?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search === null || date_filter.search === '') ? '' : `&search=${date_filter.search}`}`);
}
const create_group_attribute = (data) => {
    return api_admin.post(`/product/api/v1/create-group-attribute`, data);
}
const get_group_attribute = (id) => {
    return api_admin.get(`/product/api/v1/get-group-attribute/${id}`);
}
const delete_group_attribute = (id) => {
    return api_admin.delete(`/product/api/v1/update-group-attribute/${id}`);
}
const edit_group_attribute = (id, data) => {
    return api_admin.put(`/product/api/v1/update-group-attribute/${id}`, data);
}
export {
    get_list_group_attribute, create_group_attribute, get_group_attribute, delete_group_attribute, edit_group_attribute
}