import apiAdmin from '@auths/apiAdmin';
const getListBanner = (date_filter) => {
    return apiAdmin.get(`/settings/api/v1/list-banner?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createBanner = (data) => {
    return apiAdmin.post(`/settings/api/v1/create-banner`, data);
}
const getDataBanner = (id) => {
    return apiAdmin.get(`/settings/api/v1/get-banner/${id}`);
}
const deleteBanner = (id) => {
    return apiAdmin.delete(`/settings/api/v1/update-banner/${id}`);
}
const editBanner = (id, data) => {
    return apiAdmin.put(`/settings/api/v1/update-banner/${id}`, data);
}
export {
    getListBanner, createBanner, getDataBanner, deleteBanner, editBanner,
}