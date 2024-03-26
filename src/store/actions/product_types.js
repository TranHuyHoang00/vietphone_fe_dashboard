import action_types from './action_types';
import { get_product, edit_product } from '../../services/product_service';
import { message } from 'antd';

export const get_product_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_start());
            let data = await get_product(id);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_product_success(data.data.data));
            } else {
                dispatch(product_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(product_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const edit_product_redux = (id, data_product) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_start());
            let data = await edit_product(id, data_product);
            if (data && data.data && data.data.success == 1) {
                dispatch(product_success());
                message.success('Thành công');
            } else {
                dispatch(product_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(product_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const product_start = () => ({
    type: action_types.PRODUCT_START,
})
export const product_faided = () => ({
    type: action_types.PRODUCT_FAIDED,
})
export const product_success = () => ({
    type: action_types.PRODUCT_SUCCESS,
})

export const get_product_success = (data) => ({
    type: action_types.GET_PRODUCT_SUCCESS,
    data: data
})

export const on_change_product_redux = (event, id, type_onchange) => ({
    type: action_types.ON_CHANGE_PRODUCT,
    event,
    id,
    type_onchange,

})

export const click_edit_product_redux = (data) => ({
    type: action_types.CLICK_EDIT_PRODUCT,
    data: data
})