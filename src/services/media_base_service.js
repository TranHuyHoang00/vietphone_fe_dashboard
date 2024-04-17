import api_admin from '../auths/api_admin';
const get_list_media_base = (date_filter) => {
    return api_admin.get(`/settings/api/v1/list-media-base?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_media_base = (data) => {
    return api_admin.post(`/settings/api/v1/create-media-base`, data);
}
const get_media_base = (id) => {
    return api_admin.get(`/settings/api/v1/get-media-base/${id}`);
}
const delete_media_base = (id) => {
    return api_admin.delete(`/settings/api/v1/delete-media-base/${id}`);
}
const edit_media_base = (id, data) => {
    return api_admin.put(`/settings/api/v1/update-media-base/${id}`, data);
}
export {
    get_list_media_base, create_media_base, get_media_base, delete_media_base, edit_media_base
}