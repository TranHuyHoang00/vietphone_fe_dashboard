import action_types from '@actions/action_types';
import { getListUser, getDataUser, createUser, deleteUser, editUser, getListUserPermission } from '@services/user_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';
export const getListUserRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await getListUser(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_user_success(data.data.data));
            } else {
                dispatch(user_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(user_faided());
            showNotification(error);
        }
    }
}
export const getDataUserRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await getDataUser(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_user_success(data.data.data));
            } else {
                dispatch(user_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(user_faided());
            showNotification(error);
        }
    }
}
export const createUserRedux = (dataUser) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await createUser(dataUser);
            if (data && data.data && data.data.success === 1) {
                dispatch(user_success());
                message.success('Thành công');
            } else {
                dispatch(user_faided());
                message.error('Lỗi,vui lòng kiểm tra lại thông tin');
            }
        } catch (error) {
            dispatch(user_faided());
            showNotification(error);
        }
    }
}
export const deleteListUserRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(user_start());
        for (const id of list_id) {
            try {
                let data = await deleteUser(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(user_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(user_success());
    }
}
export const editListUserRedux = (list_id, dataUser) => {
    return async (dispatch, getState) => {
        dispatch(user_start());
        for (const id of list_id) {
            try {
                let data = await editUser(id, dataUser);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(user_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(user_success());
    }
}
export const editUserRedux = (id, dataUser) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await editUser(id, dataUser);
            if (data && data.data && data.data.success === 1) {
                dispatch(user_success());
                message.success('Thành công');
            } else {
                dispatch(user_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(user_faided());
            showNotification(error);
        }
    }
}
export const get_list_user_permission_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await getListUserPermission();
            if (data && data.data && data.data.success === 1) {
                let data_raw = data.data.data;
                if (data_raw?.is_superuser === true) {
                    dispatch(get_list_user_permission_success([]));
                    dispatch(set_is_superuser_redux(true));
                } else {
                    dispatch(get_list_user_permission_success(data_raw));
                    dispatch(set_is_superuser_redux(false));
                }
            } else {
                dispatch(user_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(user_faided());
            showNotification(error);
        }
    }
}
export const user_start = () => ({
    type: action_types.USER_START,
})
export const user_success = () => ({
    type: action_types.USER_SUCCESS,
})
export const user_faided = () => ({
    type: action_types.USER_FAIDED,
})

export const get_list_user_success = (data) => ({
    type: action_types.GET_LIST_USER_SUCCESS,
    data
})
export const get_user_success = (data) => ({
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
export const get_list_user_permission_success = (data) => ({
    type: action_types.GET_LIST_USER_PERMISSION_SUCCESS,
    data
})
export const set_is_superuser_redux = (data) => ({
    type: action_types.SET_IS_SUPERUSER,
    data,
})