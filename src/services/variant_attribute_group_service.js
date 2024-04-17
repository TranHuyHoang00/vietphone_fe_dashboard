import api_admin from '../auths/api_admin';
const get_list_variant_attribute_group = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-variant-attribute-group?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_variant_attribute_group = (data) => {
    return api_admin.post(`/product/api/v1/create-variant-attribute-group`, data);
}
const get_variant_attribute_group = (id) => {
    return api_admin.get(`/product/api/v1/get-variant-attribute-group/${id}`);
}
const delete_variant_attribute_group = (id) => {
    return api_admin.delete(`/product/api/v1/delete-variant-attribute-group/${id}`);
}
const edit_variant_attribute_group = (id, data) => {
    return api_admin.put(`/product/api/v1/update-variant-attribute-group/${id}`, data);
}
export {
    get_list_variant_attribute_group, create_variant_attribute_group, get_variant_attribute_group, delete_variant_attribute_group, edit_variant_attribute_group
}