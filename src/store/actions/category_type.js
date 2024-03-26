import action_types from './action_types';
import { get_list_category, create_category } from '../../services/category_service';
import { message } from 'antd';

export const get_list_category_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await get_list_category(data_filter);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_list_category_success(data.data.data.categories));
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_category_redux = (data_category) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await create_category(data_category);
            if (data && data.data && data.data.success == 1) {
                dispatch(category_success());
                message.success('Thành công');
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const category_start = () => ({
    type: action_types.CATEGORY_START,
})
export const category_success = () => ({
    type: action_types.CATEGORY_SUCCESS,
})
export const category_faided = () => ({
    type: action_types.CATEGORY_FAIDED,
})

export const get_list_category_success = (data) => ({
    type: action_types.GET_LIST_CATEGORY_SUCCESS,
    data: data
})
export const on_change_category_redux = (event, id, type_onchange) => ({
    type: action_types.ON_CHANGE_CATEGORY,
    event,
    id,
    type_onchange,

})