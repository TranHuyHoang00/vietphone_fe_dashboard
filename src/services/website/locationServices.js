import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListLocation = (dataFilter) => {
    return apiAdmin.get(`/settings/api/v1/list-location?${getUrlApi(dataFilter)}`);
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