import apiAdmin from '@auths/apiAdmin';
const get_list_media_base = (date_filter) => {
    return apiAdmin.get(`/settings/api/v1/list-media-base?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createMediaBase = (data) => {
    return apiAdmin.post(`/settings/api/v1/create-media-base`, data);
}
const get_media_base = (id) => {
    return apiAdmin.get(`/settings/api/v1/get-media-base/${id}`);
}
const delete_media_base = (id) => {
    return apiAdmin.delete(`/settings/api/v1/delete-media-base/${id}`);
}
const edit_media_base = (id, data) => {
    return apiAdmin.put(`/settings/api/v1/update-media-base/${id}`, data);
}
export {
    get_list_media_base, createMediaBase, get_media_base, delete_media_base, edit_media_base
}