import apiAdmin from '@auths/apiAdmin';
const getListTargetShop = (date_filter) => {
    return apiAdmin.get(`/analytic/api/v1/list-shop-monthly-target?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const createTargetShop = (data) => {
    return apiAdmin.post(`/analytic/api/v1/create-shop-monthly-target`, data);
}
const getDataTargetShop = (id) => {
    return apiAdmin.get(`/analytic/api/v1/get-shop-monthly-target/${id}`);
}
const deleteTargetShop = (id) => {
    return apiAdmin.delete(`/analytic/api/v1/delete-shop-monthly-target/${id}`);
}
const editTargetShop = (id, data) => {
    return apiAdmin.put(`/analytic/api/v1/update-shop-monthly-target/${id}`, data);
}
export {
    getListTargetShop, createTargetShop, getDataTargetShop, deleteTargetShop, editTargetShop
}