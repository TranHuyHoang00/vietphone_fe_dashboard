import api_admin from '../auths/api_admin';
const get_list_category_post = (date_filter) => {
    return api_admin.get(`/bai-viet/api/v1/list-category?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_category_post = (data) => {
    return api_admin.post(`/bai-viet/api/v1/create-category`, data);
}
const get_category_post = (id) => {
    return api_admin.get(`/bai-viet/api/v1/get-category/${id}`);
}
const delete_category_post = (id) => {
    return api_admin.delete(`/bai-viet/api/v1/delete-category/${id}`);
}
const edit_category_post = (id, data) => {
    return api_admin.put(`/bai-viet/api/v1/update-category/${id}`, data);
}
export {
    get_list_category_post, create_category_post, get_category_post, delete_category_post, edit_category_post
}