import api_admin from '../auths/api_admin';
const get_list_task = (date_filter) => {
    return api_admin.get(`/sapo/api/v1/list-task-result?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search_query == null || date_filter.search_query == '') ? '' : `&search_query=${date_filter.search_query}`}`);
}
const sync_all_products = () => {
    return api_admin.get(`/sapo/api/v1/sync-all-products`);
}
const get_task = (id) => {
    return api_admin.get(`/sapo/api/v1/get-task-result/${id}`);
}
export {
    get_list_task, sync_all_products, get_task,
}