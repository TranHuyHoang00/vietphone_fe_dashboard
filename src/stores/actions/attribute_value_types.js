import action_types from '@actions/action_types';
import { getListAttributeValue, getAttributeValueDetail, createAttributeValue, deleteAttributeValue, editAttributeValue } from '@services/attribute_value_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';
export const getListAttributeValueRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await getListAttributeValue(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_attribute_value_success(data.data.data));
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            showNotification(error);
        }
    }
}
export const getDataAttributeValueRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await getAttributeValueDetail(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_attribute_value_success(data.data.data));
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            showNotification(error);
        }
    }
}
export const createAttributeValueRedux = (dataAttributeValue) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await createAttributeValue(dataAttributeValue);
            if (data && data.data && data.data.success === 1) {
                dispatch(attribute_value_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            showNotification(error);
        }
    }
}
export const deleteListAttributeValueRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attribute_value_start());
        for (const id of list_id) {
            try {
                let data = await deleteAttributeValue(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_value_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attribute_value_success());
    }
}
export const editListAttributeValueRedux = (list_id, dataAttributeValue) => {
    return async (dispatch, getState) => {
        dispatch(attribute_value_start());
        for (const id of list_id) {
            try {
                let data = await editAttributeValue(id, dataAttributeValue);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_value_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attribute_value_success());
    }
}
export const editAttributeValueRedux = (id, dataAttributeValue) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await editAttributeValue(id, dataAttributeValue);
            if (data && data.data && data.data.success === 1) {
                dispatch(attribute_value_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            showNotification(error);
        }
    }
}
export const attribute_value_start = () => ({
    type: action_types.ATTRIBUTE_VALUE_START,
})
export const attribute_value_success = () => ({
    type: action_types.ATTRIBUTE_VALUE_SUCCESS,
})
export const attribute_value_faided = () => ({
    type: action_types.ATTRIBUTE_VALUE_FAIDED,
})

export const get_list_attribute_value_success = (data) => ({
    type: action_types.GET_LIST_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const get_attribute_value_success = (data) => ({
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