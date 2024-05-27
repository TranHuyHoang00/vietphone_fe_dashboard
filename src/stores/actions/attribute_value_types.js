import action_types from '@actions/action_types';
import { getListAttributeValue, getAttributeValueDetail, createAttributeValue, deleteAttributeValue, editAttributeValue } from '@services/attribute_value_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';
export const getListAttributeValueRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await getListAttributeValue(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListAttributeValueSuccess(data.data.data));
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const getDataAttributeValueRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await getAttributeValueDetail(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getAttributeValueSuccess(data.data.data));
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const createAttributeValueRedux = (dataAttributeValue) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await createAttributeValue(dataAttributeValue);
            if (data && data.data && data.data.success === 1) {
                dispatch(attributeValueSuccess());
                message.success('Thành công');
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const deleteListAttributeValueRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attributeValueStart());
        for (const id of list_id) {
            try {
                const data = await deleteAttributeValue(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attributeValueFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attributeValueSuccess());
    }
}
export const editListAttributeValueRedux = (list_id, dataAttributeValue) => {
    return async (dispatch, getState) => {
        dispatch(attributeValueStart());
        for (const id of list_id) {
            try {
                const data = await editAttributeValue(id, dataAttributeValue);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attributeValueFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attributeValueSuccess());
    }
}
export const editAttributeValueRedux = (id, dataAttributeValue) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await editAttributeValue(id, dataAttributeValue);
            if (data && data.data && data.data.success === 1) {
                dispatch(attributeValueSuccess());
                message.success('Thành công');
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const attributeValueStart = () => ({
    type: action_types.ATTRIBUTE_VALUE_START,
})
export const attributeValueSuccess = () => ({
    type: action_types.ATTRIBUTE_VALUE_SUCCESS,
})
export const attributeValueFaided = () => ({
    type: action_types.ATTRIBUTE_VALUE_FAIDED,
})

export const getListAttributeValueSuccess = (data) => ({
    type: action_types.GET_LIST_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const getAttributeValueSuccess = (data) => ({
    type: action_types.GET_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const onChangeAttributeValueRedux = (value, id) => ({
    type: action_types.ON_CHANGE_ATTRIBUTE_VALUE,
    value,
    id,
})
export const setDataAttributeValueRedux = (data) => ({
    type: action_types.SET_DATA_ATTRIBUTE_VALUE,
    data,
})