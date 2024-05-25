import apiAdmin from '@auths/apiAdmin';
const get_view_product = (data) => {
    return apiAdmin.post(`/logger/api/v1/get-top-product-tracking`, data);
}
const get_view_web = (data) => {
    return apiAdmin.post(`/logger/api/v1/get-visit-tracking`, data);
}
export {
    get_view_web, get_view_product
}