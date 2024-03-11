import { data } from 'autoprefixer';
import api_admin from '../auths/api_admin';
const get_list_schedule = (data) => {
    return api_admin.post(`/management/api/v1/list-schedule`, data);
}
const create_schedule = (data) => {
    return api_admin.post(`/management/api/v1/create-schedule`, data,);
}
const get_schedule = (id) => {
    return api_admin.get(`/management/api/v1/get-schedule/${id}`,);
}
const delete_schedule = (id) => {
    return api_admin.delete(`/management/api/v1/delete-schedule/${id}`,);
}
const edit_schedule = (id, data) => {
    return api_admin.put(`/management/api/v1/update-schedule/${id}`, data,);
}
export {
    get_list_schedule, create_schedule, get_schedule, delete_schedule, edit_schedule
}