import apiAdmin from '@auths/apiAdmin';
const getListLocation = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/settings/api/v1/list-location?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createLocation = (data) => {
    return apiAdmin.post(`/settings/api/v1/create-location`, data);
}
const getDataLocation = (id) => {
    return apiAdmin.get(`/settings/api/v1/get-location/${id}`);
}
const deleteLocation = (id) => {
    return apiAdmin.delete(`/settings/api/v1/update-location/${id}`);
}
const editLocation = (id, data) => {
    return apiAdmin.put(`/settings/api/v1/update-location/${id}`, data);
}
export {
    getListLocation, createLocation, getDataLocation, deleteLocation, editLocation
}