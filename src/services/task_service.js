import apiAdmin from '@auths/apiAdmin';
const getListTask = (date_filter) => {
    return apiAdmin.get(`/sapo/api/v1/list-task-result?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
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