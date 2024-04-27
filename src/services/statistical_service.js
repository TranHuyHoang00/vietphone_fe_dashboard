import api_admin from '@auths/api_admin';
const get_view_product = (data) => {
    return api_admin.post(`/logger/api/v1/get-top-product-tracking`, data);
}
const get_view_web = (data) => {
    return api_admin.post(`/logger/api/v1/get-visit-tracking`, data);
}
export {
    get_view_web, get_view_product
}