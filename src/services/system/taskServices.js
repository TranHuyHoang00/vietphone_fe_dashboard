import apiAdmin from '@auths/apiAdmin';
import { getUrlApi } from '@utils/handleFuncUrl';
const getListTask = (dataFilter) => {
    return apiAdmin.get(`/sapo/api/v1/list-task-result?${getUrlApi(dataFilter)}`);
}
const syncAllProducts = () => {
    return apiAdmin.get(`/sapo/api/v1/sync-all-products`);
}
const getDataTask = (id) => {
    return apiAdmin.get(`/sapo/api/v1/get-task-result/${id}`);
}
const createTask = (data) => {
}
const deleteTask = (id) => {
}
const editTask = (id, data) => {
}
export {
    getListTask, syncAllProducts, getDataTask, createTask, deleteTask, editTask
}