import action_types from '@actions/action_types';
import { getListVariantAttributeGroup, getDataVariantAttributeGroup, createVariantAttributeGroup, deleteVariantAttributeGroup, editVariantAttributeGroup } from '@services/variant_attribute_group_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListVariantAttributeGroupRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await getListVariantAttributeGroup(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_variant_attribute_group_success(data.data.data));
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            showNotification(error);
        }
    }
}
export const getDataVariantAttributeGroupRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await getDataVariantAttributeGroup(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_variant_attribute_group_success(data.data.data));
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            showNotification(error);
        }
    }
}
export const createVariantAttributeGroupRedux = (dataVariantAttributeGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await createVariantAttributeGroup(dataVariantAttributeGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_attribute_group_success());
                message.success('Thành công');
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            showNotification(error);
        }
    }
}
export const deleteListVariantAttributeGroupRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(variant_attribute_group_start());
        for (const id of list_id) {
            try {
                let data = await deleteVariantAttributeGroup(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_attribute_group_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variant_attribute_group_success());
    }
}
export const editListVariantAttributeGroupRedux = (list_id, dataVariantAttributeGroup) => {
    return async (dispatch, getState) => {
        dispatch(variant_attribute_group_start());
        for (const id of list_id) {
            try {
                let data = await editVariantAttributeGroup(id, dataVariantAttributeGroup);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_attribute_group_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(variant_attribute_group_success());
    }
}
export const editVariantAttributeGroupRedux = (id, dataVariantAttributeGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await editVariantAttributeGroup(id, dataVariantAttributeGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_attribute_group_success());
                message.success('Thành công');
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            showNotification(error);
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
    data
})
export const get_variant_attribute_group_success = (data) => ({
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
