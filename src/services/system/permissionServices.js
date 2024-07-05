import apiAdmin from '@auths/apiAdmin';
const getListPermission = (date_filter) => {
    return apiAdmin.get(`/auth/api/v1/list-permission?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
export {
    getListPermission
}