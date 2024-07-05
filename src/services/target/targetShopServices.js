import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListTargetShop = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-shop-monthly-target?${getUrlApi(dataFilter)}`);
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