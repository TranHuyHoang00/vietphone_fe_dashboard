import apiAdmin from '@auths/apiAdmin';
const getViewProduct = (data) => {
    return apiAdmin.post(`/logger/api/v1/get-top-product-tracking`, data);
}
const getViewWeb = (data) => {
    return apiAdmin.post(`/logger/api/v1/get-visit-tracking`, data);
}
export {
    getViewWeb, getViewProduct
}