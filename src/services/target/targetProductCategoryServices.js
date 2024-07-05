import apiAdmin from '@auths/apiAdmin';
const getListTargetProductCategory = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/analytic/api/v1/list-target-product-category?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createTargetProductCategory = (data) => {
    return apiAdmin.post(`/analytic/api/v1/create-target-product-category`, data);
}
const getDataTargetProductCategory = (id) => {
    return apiAdmin.get(`/analytic/api/v1/get-target-product-category/${id}`);
}
const deleteTargetProductCategory = (id) => {
    return apiAdmin.delete(`/analytic/api/v1/delete-target-product-category/${id}`);
}
const editTargetProductCategory = (id, data) => {
    return apiAdmin.put(`/analytic/api/v1/update-target-product-category/${id}`, data);
}
export {
    getListTargetProductCategory, createTargetProductCategory, getDataTargetProductCategory, deleteTargetProductCategory, editTargetProductCategory
}