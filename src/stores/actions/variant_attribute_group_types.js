import action_types from '@actions/action_types';
import { getListVariantAttributeGroup, getDataVariantAttributeGroup, createVariantAttributeGroup, deleteVariantAttributeGroup, editVariantAttributeGroup } from '@services/variant_attribute_group_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListVariantAttributeGroupRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantAttributeGroupStart());
            let data = await getListVariantAttributeGroup(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListVariantAttributeGroupSuccess(data.data.data));
            } else {
                dispatch(variantAttributeGroupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantAttributeGroupFaided());
            showNotification(error);
        }
    }
}
export const getDataVariantAttributeGroupRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantAttributeGroupStart());
            let data = await getDataVariantAttributeGroup(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getVariantAttributeGroupSuccess(data.data.data));
            } else {
                dispatch(variantAttributeGroupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantAttributeGroupFaided());
            showNotification(error);
        }
    }
}
export const createVariantAttributeGroupRedux = (dataVariantAttributeGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantAttributeGroupStart());
            let data = await createVariantAttributeGroup(dataVariantAttributeGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(variantAttributeGroupSuccess());
                message.success('Thành công');
            } else {
                dispatch(variantAttributeGroupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantAttributeGroupFaided());
            showNotification(error);
        }
    }
}
export const deleteListVariantAttributeGroupRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(variantAttributeGroupStart());
        for (const id of list_id) {
            try {
                let data = await deleteVariantAttributeGroup(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(variantAttributeGroupFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variantAttributeGroupSuccess());
    }
}
export const editListVariantAttributeGroupRedux = (list_id, dataVariantAttributeGroup) => {
    return async (dispatch, getState) => {
        dispatch(variantAttributeGroupStart());
        for (const id of list_id) {
            try {
                let data = await editVariantAttributeGroup(id, dataVariantAttributeGroup);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(variantAttributeGroupFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variantAttributeGroupSuccess());
    }
}
export const editVariantAttributeGroupRedux = (id, dataVariantAttributeGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variantAttributeGroupStart());
            let data = await editVariantAttributeGroup(id, dataVariantAttributeGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(variantAttributeGroupSuccess());
                message.success('Thành công');
            } else {
                dispatch(variantAttributeGroupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variantAttributeGroupFaided());
            showNotification(error);
        }
    }
}
export const variantAttributeGroupStart = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_START,
})
export const variantAttributeGroupSuccess = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_SUCCESS,
})
export const variantAttributeGroupFaided = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_FAIDED,
})

export const getListVariantAttributeGroupSuccess = (data) => ({
    type: action_types.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS,
    data
})
export const getVariantAttributeGroupSuccess = (data) => ({
    type: action_types.GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS,
    data
})
export const onChangeVariantAttributeGroupRedux = (value, id) => ({
    type: action_types.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP,
    value,
    id,
})
export const setDataVariantAttributeGroupRedux = (data) => ({
    type: action_types.SET_DATA_VARIANT_ATTRIBUTE_GROUP,
    data,
})
