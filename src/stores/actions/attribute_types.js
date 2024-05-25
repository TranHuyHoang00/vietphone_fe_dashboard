import action_types from '@actions/action_types';
import { getListAttribute, getDataAttribute, createAttribute, deleteAttribute, editAttribute } from '@services/attribute_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListAttributeRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await getListAttribute(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_attribute_success(data.data.data));
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            showNotification(error);
        }
    }
}
export const getDataAttributeRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await getDataAttribute(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_attribute_success(data.data.data));
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            showNotification(error);
        }
    }
}
export const createAttributeRedux = (dataAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await createAttribute(dataAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(attribute_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            showNotification(error);
        }
    }
}
export const deleteListAttributeRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attribute_start());
        for (const id of list_id) {
            try {
                let data = await deleteAttribute(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attribute_success());
    }
}
export const editListAttributeRedux = (list_id, dataAttribute) => {
    return async (dispatch, getState) => {
        dispatch(attribute_start());
        for (const id of list_id) {
            try {
                let data = await editAttribute(id, dataAttribute);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attribute_success());
    }
}
export const editAttributeRedux = (id, dataAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await editAttribute(id, dataAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(attribute_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            showNotification(error);
        }
    }
}
export const attribute_start = () => ({
    type: action_types.ATTRIBUTE_START,
})
export const attribute_success = () => ({
    type: action_types.ATTRIBUTE_SUCCESS,
})
export const attribute_faided = () => ({
    type: action_types.ATTRIBUTE_FAIDED,
})

export const get_list_attribute_success = (data) => ({
    type: action_types.GET_LIST_ATTRIBUTE_SUCCESS,
    data
})
export const get_attribute_success = (data) => ({
    type: action_types.GET_ATTRIBUTE_SUCCESS,
    data
})
export const onChangeAttributeRedux = (value, id) => ({
    type: action_types.ON_CHANGE_ATTRIBUTE,
    value,
    id,
})
export const setDataAttributeRedux = (data) => ({
    type: action_types.SET_DATA_ATTRIBUTE,
    data,
})