import action_types from '@actions/action_types';
import { getListPermission } from '@services/permission_service';
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
    type: action_types.PERMISSION_START,
})
export const permissionSuccess = () => ({
    type: action_types.PERMISSION_SUCCESS,
})
export const permissionFaided = () => ({
    type: action_types.PERMISSION_FAIDED,
})

export const getListPermissionSuccess = (data) => ({
    type: action_types.GET_LIST_PERMISSION_SUCCESS,
    data
})
