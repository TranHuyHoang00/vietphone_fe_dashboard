import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListReportTargetShop = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-shop-monthly-target?${getUrlApi(dataFilter)}`);
}
const getAllReportTargetShop = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-shop-monthly-target?${getUrlApi(dataFilter)}`);
}
const getReportTargetShop = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-shop-monthly-target?${getUrlApi(dataFilter)}`);
}

const getListReportTargetStaff = (dataFilter, ListId) => {
    const queryStaff = `staffs=${ListId.join(',')}`;
    return apiAdmin.get(`analytic/api/v1/get-revenue-by-staff?${queryStaff}&${getUrlApi(dataFilter)}`);
}
const getAllReportTargetStaff = (dataFilter) => {
    return apiAdmin.get(`analytic/api/v1/list-revenue-by-staff`, dataFilter);
}

const getReportTargetStaff = (dataFilter) => {
    return apiAdmin.get(`/analytic/api/v1/list-shop-monthly-target?${getUrlApi(dataFilter)}`);
}
export {
    getListReportTargetShop, getAllReportTargetShop, getListReportTargetStaff, getAllReportTargetStaff,
    getReportTargetShop, getReportTargetStaff
}