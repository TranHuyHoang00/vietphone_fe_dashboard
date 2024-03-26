import action_types from './action_types';
import { get_list_variant_attribute_group, create_variant_attribute_group } from '../../services/variant_attribute_group_service';
import { message } from 'antd';

export const get_list_variant_attribute_group_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await get_list_variant_attribute_group(data_filter);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_list_variant_attribute_group_success(data.data.data.varriant_attribute_groups));
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_variant_attribute_group_redux = (data_variant_attribute_group) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await create_variant_attribute_group(data_variant_attribute_group);
            if (data && data.data && data.data.success == 1) {
                dispatch(variant_attribute_group_success());
                message.success('Thành công');
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const variant_attribute_group_start = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_START,
})
export const variant_attribute_group_success = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_SUCCESS,
})
export const variant_attribute_group_faided = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_FAIDED,
})

export const get_list_variant_attribute_group_success = (data) => ({
    type: action_types.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS,
    data: data
})
export const on_change_variant_attribute_group_redux = (event, id, type_onchange) => ({
    type: action_types.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP,
    event,
    id,
    type_onchange,

})