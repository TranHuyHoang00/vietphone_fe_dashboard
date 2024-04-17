import api_admin from '../auths/api_admin';
const get_list_attribute_value = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-attribute-value?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_attribute_value = (data) => {
    return api_admin.post(`/product/api/v1/create-attribute-value`, data);
}
const get_attribute_value = (id) => {
    return api_admin.get(`/product/api/v1/update-attribute-value/${id}`);
}
const get_attribute_value_detail = (id) => {
    return api_admin.get(`/product/api/v1/get-attribute-value/${id}`);
}
const delete_attribute_value = (id) => {
    return api_admin.delete(`/product/api/v1/delete-attribute-value/${id}`);
}
const edit_attribute_value = (id, data) => {
    return api_admin.put(`/product/api/v1/update-attribute-value/${id}`, data);
}
export {
    get_list_attribute_value, create_attribute_value, get_attribute_value, delete_attribute_value, edit_attribute_value,
    get_attribute_value_detail
}