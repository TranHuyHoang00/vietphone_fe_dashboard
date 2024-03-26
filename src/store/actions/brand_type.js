import action_types from './action_types';
import { get_list_brand, create_brand } from '../../services/brand_service';
import { message } from 'antd';

export const get_list_brand_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await get_list_brand(data_filter);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_list_brand_success(data.data.data.brands));
            } else {
                dispatch(brand_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brand_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_brand_redux = (data_brand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await create_brand(data_brand);
            if (data && data.data && data.data.success == 1) {
                dispatch(brand_success());
                message.success('Thành công');
            } else {
                dispatch(brand_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brand_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const brand_start = () => ({
    type: action_types.BRAND_START,
})
export const brand_success = () => ({
    type: action_types.BRAND_SUCCESS,
})
export const brand_faided = () => ({
    type: action_types.BRAND_FAIDED,
})

export const get_list_brand_success = (data) => ({
    type: action_types.GET_LIST_BRAND_SUCCESS,
    data: data
})
export const on_change_brand_redux = (event, id, type_onchange) => ({
    type: action_types.ON_CHANGE_BRAND,
    event,
    id,
    type_onchange,

})