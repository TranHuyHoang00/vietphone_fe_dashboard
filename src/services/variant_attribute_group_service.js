import api_admin from '@auths/api_admin';
const getListVariantAttributeGroup = (date_filter) => {
    return api_admin.get(`/product/api/v1/list-variant-attribute-group?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createVariantAttributeGroup = (data) => {
    return api_admin.post(`/product/api/v1/create-variant-attribute-group`, data);
}
const getDataVariantAttributeGroup = (id) => {
    return api_admin.get(`/product/api/v1/get-variant-attribute-group/${id}`);
}
const delete_variant_attribute_group = (id) => {
    return api_admin.delete(`/product/api/v1/delete-variant-attribute-group/${id}`);
}
const editVariantAttributeGroup = (id, data) => {
    return api_admin.put(`/product/api/v1/update-variant-attribute-group/${id}`, data);
}
export {
    getListVariantAttributeGroup, createVariantAttributeGroup, getDataVariantAttributeGroup, delete_variant_attribute_group, editVariantAttributeGroup
}