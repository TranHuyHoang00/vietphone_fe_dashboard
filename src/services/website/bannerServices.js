import apiAdmin from '@auths/apiAdmin';
const getListBanner = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/settings/api/v1/list-banner?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
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