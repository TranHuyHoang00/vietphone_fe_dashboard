import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListMediaBase = (dataFilter) => {
    return apiAdmin.get(`/settings/api/v1/list-media-base?${getUrlApi(dataFilter)}`);
}
const createMediaBase = (data) => {
    return apiAdmin.post(`/settings/api/v1/create-media-base`, data);
}
const getDataMediaBase = (id) => {
    return apiAdmin.get(`/settings/api/v1/get-media-base/${id}`);
}
const deleteMediaBase = (id) => {
    return apiAdmin.delete(`/settings/api/v1/delete-media-base/${id}`);
}
const editMediaBase = (id, data) => {
    return apiAdmin.put(`/settings/api/v1/update-media-base/${id}`, data);
}
export {
    getListMediaBase, createMediaBase, getDataMediaBase, deleteMediaBase, editMediaBase
}