import action_types from '@actions/action_types';
import { getListPermission } from '@services/permission_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListPermissionRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(permission_start());
            let data = await getListPermission(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_permission_success(data.data.data));
            } else {
                dispatch(permission_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(permission_faided());
            showNotification(error);
        }
    }
}
export const permission_start = () => ({
    type: action_types.PERMISSION_START,
})
export const permission_success = () => ({
    type: action_types.PERMISSION_SUCCESS,
})
export const permission_faided = () => ({
    type: action_types.PERMISSION_FAIDED,
})

export const get_list_permission_success = (data) => ({
    type: action_types.GET_LIST_PERMISSION_SUCCESS,
    data
})
