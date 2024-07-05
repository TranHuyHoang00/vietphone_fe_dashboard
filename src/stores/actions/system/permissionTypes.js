import actionTypes from './actionTypes';
import { getListPermission } from '@services/system/permissionServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListPermissionRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(permissionStart());
            let data = await getListPermission(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListPermissionSuccess(data.data.data));
            } else {
                dispatch(permissionFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(permissionFaided());
            showNotification(error);
        }
    }
}
export const permissionStart = () => ({
    type: actionTypes.PERMISSION_START,
})
export const permissionSuccess = () => ({
    type: actionTypes.PERMISSION_SUCCESS,
})
export const permissionFaided = () => ({
    type: actionTypes.PERMISSION_FAIDED,
})

export const getListPermissionSuccess = (data) => ({
    type: actionTypes.GET_LIST_PERMISSION_SUCCESS,
    data
})
