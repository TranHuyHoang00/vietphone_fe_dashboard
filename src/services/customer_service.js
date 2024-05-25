import apiAdmin from '@auths/apiAdmin';
const get_list_customer = (date_filter) => {
    return apiAdmin.get(`/account/api/v1/list-customer?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_customer = (data) => {
    return apiAdmin.post(`/auth/api/v1/create-customer`, data,);
}
const get_customer = (id) => {
    return apiAdmin.get(`/account/api/v1/get-customer/${id}`,);
}
const delete_customer = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-customer/${id}`,);
}
const edit_customer = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-customer/${id}`, data,);
}
export {
    get_list_customer, create_customer, get_customer, delete_customer, edit_customer
}