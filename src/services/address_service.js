import apiAdmin from '@auths/apiAdmin';
const getListProvince = (date_filter) => {
    return apiAdmin.get(`/address/api/v1/list-province?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const getListDistrict = (date_filter) => {
    return apiAdmin.get(`/address/api/v1/list-district?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const getListWard = (date_filter) => {
    return apiAdmin.get(`/address/api/v1/list-ward?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const getProvince = (id) => {
    return apiAdmin.get(`/address/api/v1/get-province/${id}`);
}
const getDistrict = (id) => {
    return apiAdmin.get(`/address/api/v1/get-district/${id}`);
}
const getWard = (id) => {
    return apiAdmin.get(`/address/api/v1/get-ward/${id}`);
}
export {
    getListProvince, getListDistrict, getListWard, getProvince, getDistrict, getWard
}