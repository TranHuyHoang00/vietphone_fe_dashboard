import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListVariantAttributeGroup = (dataFilter) => {
    return apiAdmin.get(`/product/api/v1/list-variant-attribute-group?${getUrlApi(dataFilter)}`);
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