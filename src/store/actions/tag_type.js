import action_types from './action_types';
import { get_list_tag, create_tag } from '../../services/tag_service';
import { message } from 'antd';

export const get_list_tag_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await get_list_tag(data_filter);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_list_tag_success(data.data.data.tags));
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_tag_redux = (data_tag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await create_tag(data_tag);
            if (data && data.data && data.data.success == 1) {
                dispatch(tag_success());
                message.success('Thành công');
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const tag_start = () => ({
    type: action_types.TAG_START,
})
export const tag_success = () => ({
    type: action_types.TAG_SUCCESS,
})
export const tag_faided = () => ({
    type: action_types.TAG_FAIDED,
})

export const get_list_tag_success = (data) => ({
    type: action_types.GET_LIST_TAG_SUCCESS,
    data: data
})
export const on_change_tag_redux = (event, id, type_onchange) => ({
    type: action_types.ON_CHANGE_TAG,
    event,
    id,
    type_onchange,

})