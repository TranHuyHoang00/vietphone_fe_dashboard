import action_types from '@actions/action_types';
import { getListUser, getDataUser, createUser, deleteUser, editUser, getListUserPermission } from '@services/user_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';
export const getListUserRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userStart());
            let data = await getListUser(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListUserSuccess(data.data.data));
            } else {
                dispatch(userFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(userFaided());
            showNotification(error);
        }
    }
}
export const getDataUserRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userStart());
            let data = await getDataUser(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getUserSuccess(data.data.data));
            } else {
                dispatch(userFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(userFaided());
            showNotification(error);
        }
    }
}
export const createUserRedux = (dataUser) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userStart());
            let data = await createUser(dataUser);
            if (data && data.data && data.data.success === 1) {
                dispatch(userSuccess());
                message.success('Thành công');
            } else {
                dispatch(userFaided());
                message.error('Lỗi,vui lòng kiểm tra lại thông tin');
            }
        } catch (error) {
            dispatch(userFaided());
            showNotification(error);
        }
    }
}
export const deleteListUserRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(userStart());
        for (const id of list_id) {
            try {
                let data = await deleteUser(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(userFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(userSuccess());
    }
}
export const editListUserRedux = (list_id, dataUser) => {
    return async (dispatch, getState) => {
        dispatch(userStart());
        for (const id of list_id) {
            try {
                let data = await editUser(id, dataUser);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(userFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(userSuccess());
    }
}
export const editUserRedux = (id, dataUser) => {
    return async (dispatch, getState) => {
        try {
            dispatch(userStart());
            let data = await editUser(id, dataUser);
            if (data && data.data && data.data.success === 1) {
                dispatch(userSuccess());
                message.success('Thành công');
            } else {
                dispatch(userFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(userFaided());
            showNotification(error);
        }
    }
}
export const getListUserPermissionRedux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(userStart());
            let data = await getListUserPermission();
            if (data && data.data && data.data.success === 1) {
                let data_raw = data.data.data;
                if (data_raw?.is_superuser === true) {
                    dispatch(getListUserPermissionSuccess([]));
                    dispatch(setSuperUserRedux(true));
                } else {
                    dispatch(getListUserPermissionSuccess(data_raw));
                    dispatch(setSuperUserRedux(false));
                }
            } else {
                dispatch(userFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(userFaided());
            showNotification(error);
        }
    }
}
export const userStart = () => ({
    type: action_types.USER_START,
})
export const userSuccess = () => ({
    type: action_types.USER_SUCCESS,
})
export const userFaided = () => ({
    type: action_types.USER_FAIDED,
})

export const getListUserSuccess = (data) => ({
    type: action_types.GET_LIST_USER_SUCCESS,
    data
})
export const getUserSuccess = (data) => ({
    type: action_types.GET_USER_SUCCESS,
    data
})
export const onChangeUserRedux = (value, id) => ({
    type: action_types.ON_CHANGE_USER,
    value,
    id,
})
export const setDataUserRedux = (data) => ({
    type: action_types.SET_DATA_USER,
    data,
})
export const getListUserPermissionSuccess = (data) => ({
    type: action_types.GET_LIST_USER_PERMISSION_SUCCESS,
    data
})
export const setSuperUserRedux = (data) => ({
    type: action_types.SET_IS_SUPERUSER,
    data,
})