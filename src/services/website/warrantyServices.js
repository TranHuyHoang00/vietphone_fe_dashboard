import apiAdmin from '@auths/apiAdmin';
const getListWarranty = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-warranty?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createWarranty = (data) => {
    return apiAdmin.post(`/product/api/v1/create-warranty`, data);
}
const getDataWarranty = (id) => {
    return apiAdmin.get(`/product/api/v1/get-warranty/${id}`);
}
const deleteWarranty = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-warranty/${id}`);
}
const editWarranty = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-warranty/${id}`, data);
}
export {
    getListWarranty, createWarranty, getDataWarranty, deleteWarranty, editWarranty
}