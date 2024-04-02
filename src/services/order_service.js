import api_admin from '../auths/api_admin';
const get_list_order = (date_filter) => {
    return api_admin.get(`/order/api/v1/list-order?page=${date_filter.page}&limit=${date_filter.limit}${(date_filter.search_query === null || date_filter.search_query === '') ? '' : `&search_query=${date_filter.search_query}`}`);
}
const create_order = (data) => {
    return api_admin.post(`/auth/api/v1/create-order`, data,);
}
const get_order = (id) => {
    return api_admin.get(`/order/api/v1/get-order/${id}`);
}
const delete_order = (id) => {
    return api_admin.delete(`/auth/api/v1/delete-order/${id}`,);
}
const edit_order = (id, data) => {
    return api_admin.put(`/auth/api/v1/update-order/${id}`, data,);
}
export {
    get_list_order, create_order, get_order, delete_order, edit_order
}