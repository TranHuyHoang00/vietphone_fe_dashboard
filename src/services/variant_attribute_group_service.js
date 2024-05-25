import apiAdmin from '@auths/apiAdmin';
const getListVariantAttributeGroup = (date_filter) => {
    return apiAdmin.get(`/product/api/v1/list-variant-attribute-group?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createVariantAttributeGroup = (data) => {
    return apiAdmin.post(`/product/api/v1/create-variant-attribute-group`, data);
}
const getDataVariantAttributeGroup = (id) => {
    return apiAdmin.get(`/product/api/v1/get-variant-attribute-group/${id}`);
}
const deleteVariantAttributeGroup = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-variant-attribute-group/${id}`);
}
const editVariantAttributeGroup = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-variant-attribute-group/${id}`, data);
}
export {
    getListVariantAttributeGroup, createVariantAttributeGroup, getDataVariantAttributeGroup, deleteVariantAttributeGroup, editVariantAttributeGroup
}