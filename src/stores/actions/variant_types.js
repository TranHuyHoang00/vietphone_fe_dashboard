import action_types from '@actions/action_types';
import { getListVariant, getDataVariant, createVariant, deleteVariant, editVariant } from '@services/variant_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListVariantRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantStart());
            let data = await getListVariant(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListVariantSuccess(data.data.data));
            } else {
                dispatch(variantFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantFaided());
            showNotification(error);
        }
    }
}
export const getDataVariantRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantStart());
            let data = await getDataVariant(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getVariantSuccess(data.data.data));
            } else {
                dispatch(variantFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantFaided());
            showNotification(error);
        }
    }
}
export const createVariantRedux = (dataVariant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantStart());
            let data = await createVariant(dataVariant);
            if (data && data.data && data.data.success === 1) {
                dispatch(variantSuccess());
                message.success('Thành công');
            } else {
                dispatch(variantFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantFaided());
            showNotification(error);
        }
    }
}
export const deleteListVariantRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(variantStart());
        for (const id of list_id) {
            try {
                let data = await deleteVariant(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(variantFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variantSuccess());
    }
}
export const editListVariantRedux = (list_id, dataVariant) => {
    return async (dispatch, getState) => {
        dispatch(variantStart());
        for (const id of list_id) {
            try {
                let data = await editVariant(id, dataVariant);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(variantFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variantSuccess());
    }
}
export const editVariantRedux = (id, dataVariant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantStart());
            let data = await editVariant(id, dataVariant);
            if (data && data.data && data.data.success === 1) {
                dispatch(variantSuccess());
                message.success('Thành công');
            } else {
                dispatch(variantFaided());
                message.error(`Lỗi khi sửa biến thể`);
            }
        } catch (error) {
            dispatch(variantFaided());
            showNotification(error);
        }
    }
}
export const variantStart = () => ({
    type: action_types.VARIANT_START,
})
export const variantSuccess = () => ({
    type: action_types.VARIANT_SUCCESS,
})
export const variantFaided = () => ({
    type: action_types.VARIANT_FAIDED,
})

export const getListVariantSuccess = (data) => ({
    type: action_types.GET_LIST_VARIANT_SUCCESS,
    data
})
export const getVariantSuccess = (data) => ({
    type: action_types.GET_VARIANT_SUCCESS,
    data
})
export const onChangeVariantRedux = (value, id) => ({
    type: action_types.ON_CHANGE_VARIANT,
    value,
    id,
})
export const setDataVariantRedux = (data) => ({
    type: action_types.SET_DATA_VARIANT,
    data,
})

export const clickEditVariantRedux = (data) => ({
    type: action_types.CLICK_EDIT_VARIANT,
    data: data
})
export const setDataFilterVariantRedux = (data) => ({
    type: action_types.SET_DATA_FILTER_VARIANT,
    data,
})