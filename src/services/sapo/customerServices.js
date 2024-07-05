import apiAdmin from '@auths/apiAdmin';
const getListCustomer = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/account/api/v1/list-customer?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createCustomer = (data) => {
    return apiAdmin.post(`/auth/api/v1/create-customer`, data,);
}
const getDataCustomer = (id) => {
    return apiAdmin.get(`/account/api/v1/get-customer/${id}`,);
}
const deleteCustomer = (id) => {
    return apiAdmin.delete(`/auth/api/v1/delete-customer/${id}`,);
}
const editCustomer = (id, data) => {
    return apiAdmin.put(`/auth/api/v1/update-customer/${id}`, data,);
}
export {
    getListCustomer, createCustomer, getDataCustomer, deleteCustomer, editCustomer
}