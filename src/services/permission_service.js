import api_admin from '@auths/api_admin';
const get_list_permission = (date_filter) => {
    return api_admin.get(`/auth/api/v1/list-permission?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
export {
    get_list_permission
}