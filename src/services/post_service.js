import api_admin from '../auths/api_admin';
const get_list_post = (date_filter) => {
    return api_admin.get(`/bai-viet/api/v1/list-post?page=${date_filter.page}&limit=${date_filter.limit}${date_filter.search === '' ? '' : `&search=${date_filter.search}`}`);
}
const create_post = (data) => {
    return api_admin.post(`/bai-viet/api/v1/create-post`, data);
}
const get_post = (id) => {
    return api_admin.get(`/bai-viet/api/v1/get-post/${id}`);
}
const delete_post = (id) => {
    return api_admin.delete(`/bai-viet/api/v1/delete-post/${id}`);
}
const edit_post = (id, data) => {
    return api_admin.put(`/bai-viet/api/v1/update-post/${id}`, data);
}
export {
    get_list_post, create_post, get_post, delete_post, edit_post
}