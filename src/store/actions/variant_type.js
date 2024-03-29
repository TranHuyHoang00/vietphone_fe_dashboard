import action_types from './action_types';
import { get_variant, edit_variant } from '../../services/variant_service';
import { message } from 'antd';

export const get_variant_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await get_variant(id);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_variant_success(data.data.data));
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const edit_variant_redux = (id, data_variant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await edit_variant(id, data_variant);
            if (data && data.data && data.data.success == 1) {
                dispatch(variant_success());
                message.success('Thành công');
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const variant_start = () => ({
    type: action_types.VARIANT_START,
})
export const variant_faided = () => ({
    type: action_types.VARIANT_FAIDED,
})
export const variant_success = () => ({
    type: action_types.VARIANT_SUCCESS,
})

export const get_variant_success = (data) => ({
    type: action_types.GET_VARIANT_SUCCESS,
    data: data
})

export const on_change_variant_redux = (event, id, type_onchange) => ({
    type: action_types.ON_CHANGE_VARIANT,
    event,
    id,
    type_onchange,

})

export const click_edit_variant_redux = (data) => ({
    type: action_types.CLICK_EDIT_VARIANT,
    data: data
})