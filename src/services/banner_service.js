import api_admin from '../auths/api_admin';
const get_list_banner = (date_filter) => {
    return api_admin.get(`/settings/api/v1/list-banner?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search === null || date_filter.search === '') ? '' : `&search=${date_filter.search}`}`);
}
const create_banner = (data) => {
    return api_admin.post(`/settings/api/v1/create-banner`, data);
}
const get_banner = (id) => {
    return api_admin.get(`/settings/api/v1/get-banner/${id}`);
}
const delete_banner = (id) => {
    return api_admin.delete(`/settings/api/v1/update-banner/${id}`);
}
const edit_banner = (id, data) => {
    return api_admin.put(`/settings/api/v1/update-banner/${id}`, data);
}
const create_media_banner = (data) => {
    return api_admin.post(`/settings/api/v1/create-media-base`, data);
}
export {
    get_list_banner, create_banner, get_banner, delete_banner, edit_banner, create_media_banner
}