import apiAdmin from '@auths/apiAdmin';
const getListStaff = ({ page, limit, search }) => {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `/account/api/v1/list-staff?page=${page}&limit=${limit}${searchQuery}`;
    return apiAdmin.get(url);
}
const createStaff = (data) => {
    return apiAdmin.post(`/account/api/v1/create-staff`, data);
}
const getDataStaff = (id) => {
    return apiAdmin.get(`/account/api/v1/get-staff/${id}`);
}
const deleteStaff = (id) => {
    return apiAdmin.delete(`/account/api/v1/delete-staff/${id}`);
}
const editStaff = (id, data) => {
    return apiAdmin.put(`/account/api/v1/update-staff/${id}`, data);
}
export {
    getListStaff, createStaff, getDataStaff, deleteStaff, editStaff
}