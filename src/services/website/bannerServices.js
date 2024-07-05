import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListBanner = (dataFilter) => {
    return apiAdmin.get(`/settings/api/v1/list-banner?${getUrlApi(dataFilter)}`);
}
const createBanner = (data) => {
    return apiAdmin.post(`/settings/api/v1/create-banner`, data);
}
const getDataBanner = (id) => {
    return apiAdmin.get(`/settings/api/v1/get-banner/${id}`);
}
const deleteBanner = (id) => {
    return apiAdmin.delete(`/settings/api/v1/delete-banner/${id}`);
}
const editBanner = (id, data) => {
    return apiAdmin.put(`/settings/api/v1/update-banner/${id}`, data);
}
export {
    getListBanner, createBanner, getDataBanner, deleteBanner, editBanner,
}