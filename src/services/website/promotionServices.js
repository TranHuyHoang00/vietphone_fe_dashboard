import apiAdmin from '@auths/apiAdmin';
const getListPromotion = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/product/api/v1/list-promotion-info?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createPromotion = (data) => {
    return apiAdmin.post(`/product/api/v1/create-promotion-info`, data);
}
const getDataPromotion = (id) => {
    return apiAdmin.get(`/product/api/v1/get-promotion-info/${id}`);
}
const deletePromotion = (id) => {
    return apiAdmin.delete(`/product/api/v1/delete-promotion-info/${id}`);
}
const editPromotion = (id, data) => {
    return apiAdmin.put(`/product/api/v1/update-promotion-info/${id}`, data);
}
export {
    getListPromotion, createPromotion, getDataPromotion, deletePromotion, editPromotion
}