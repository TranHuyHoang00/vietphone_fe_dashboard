import apiAdmin from '@auths/apiAdmin';
const getListTask = (date_filter) => {
    return apiAdmin.get(`/sapo/api/v1/list-task-result?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const sync_all_products = () => {
    return apiAdmin.get(`/sapo/api/v1/sync-all-products`);
}
const getDataTask = (id) => {
    return apiAdmin.get(`/sapo/api/v1/get-task-result/${id}`);
}
const create_task = (data) => {
}
const delete_task = (id) => {
}
const edit_task = (id, data) => {
}
export {
    getListTask, sync_all_products, getDataTask, create_task, delete_task, edit_task
}