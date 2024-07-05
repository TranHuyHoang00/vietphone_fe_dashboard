import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListPermission = (dataFilter) => {
    return apiAdmin.get(`/auth/api/v1/list-permission?${getUrlApi(dataFilter)}`);
}
export {
    getListPermission
}