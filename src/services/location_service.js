import apiAdmin from '@auths/apiAdmin';
const getListLocation = (date_filter) => {
    return apiAdmin.get(`/settings/api/v1/list-location?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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