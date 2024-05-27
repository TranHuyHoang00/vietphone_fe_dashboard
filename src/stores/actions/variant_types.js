import action_types from '@actions/action_types';
import { getListVariant, getDataVariant, createVariant, deleteVariant, editVariant } from '@services/variant_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListVariantRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await getListVariant(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_variant_success(data.data.data));
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            showNotification(error);
        }
    }
}
export const getDataVariantRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await getDataVariant(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_variant_success(data.data.data));
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            showNotification(error);
        }
    }
}
export const createVariantRedux = (dataVariant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await createVariant(dataVariant);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_success());
                message.success('Thành công');
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            showNotification(error);
        }
    }
}
export const deleteListVariantRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(variant_start());
        for (const id of list_id) {
            try {
                let data = await deleteVariant(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variant_success());
    }
}
export const editListVariantRedux = (list_id, dataVariant) => {
    return async (dispatch, getState) => {
        dispatch(variant_start());
        for (const id of list_id) {
            try {
                let data = await editVariant(id, dataVariant);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variant_success());
    }
}
export const editVariantRedux = (id, dataVariant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await editVariant(id, dataVariant);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_success());
                message.success('Thành công');
            } else {
                dispatch(variant_faided());
                message.error(`Lỗi khi sửa biến thể`);
            }
        } catch (error) {
            dispatch(variant_faided());
            showNotification(error);
        }
    }
}
export const variant_start = () => ({
    type: action_types.VARIANT_START,
})
export const variant_success = () => ({
    type: action_types.VARIANT_SUCCESS,
})
export const variant_faided = () => ({
    type: action_types.VARIANT_FAIDED,
})

export const get_list_variant_success = (data) => ({
    type: action_types.GET_LIST_VARIANT_SUCCESS,
    data
})
export const get_variant_success = (data) => ({
    type: action_types.GET_VARIANT_SUCCESS,
    data
})
export const on_change_variant_redux = (value, id) => ({
    type: action_types.ON_CHANGE_VARIANT,
    value,
    id,
})
export const set_data_variant_redux = (data) => ({
    type: action_types.SET_DATA_VARIANT,
    data,
})

export const click_edit_variant_redux = (data) => ({
    type: action_types.CLICK_EDIT_VARIANT,
    data: data
})
export const set_dataFilter_variant_redux = (data) => ({
    type: action_types.SET_dataFilter_VARIANT,
    data,
})