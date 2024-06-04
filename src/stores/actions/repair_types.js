import action_types from '@actions/action_types';
import { getListRepair, getDataRepair, createRepair, deleteRepair, editRepair } from '@services/repair_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListRepairRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(repairStart());
            let data = await getListRepair(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListRepairSuccess(data.data.data));
            } else {
                dispatch(repairFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(repairFaided());
            showNotification(error);
        }
    }
}
export const getDataRepairRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(repairStart());
            let data = await getDataRepair(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getRepairSuccess(data.data.data));
            } else {
                dispatch(repairFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(repairFaided());
            showNotification(error);
        }
    }
}
export const createRepairRedux = (dataRepair) => {
    return async (dispatch, getState) => {
        try {
            dispatch(repairStart());
            let data = await createRepair(dataRepair);
            if (data && data.data && data.data.success === 1) {
                dispatch(repairSuccess());
                message.success('Thành công');
            } else {
                dispatch(repairFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(repairFaided());
            showNotification(error);
        }
    }
}
export const deleteListRepairRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(repairStart());
        for (const id of list_id) {
            try {
                let data = await deleteRepair(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(repairFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(repairSuccess());
    }
}
export const editListRepairRedux = (list_id, dataRepair) => {
    return async (dispatch, getState) => {
        dispatch(repairStart());
        for (const id of list_id) {
            try {
                let data = await editRepair(id, dataRepair);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(repairFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(repairSuccess());
    }
}
export const editRepairRedux = (id, dataRepair) => {
    return async (dispatch, getState) => {
        try {
            dispatch(repairStart());
            let data = await editRepair(id, dataRepair);
            if (data && data.data && data.data.success === 1) {
                dispatch(repairSuccess());
                message.success('Thành công');
            } else {
                dispatch(repairFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(repairFaided());
            showNotification(error);
        }
    }
}
export const repairStart = () => ({
    type: action_types.REPAIR_START,
})
export const repairSuccess = () => ({
    type: action_types.REPAIR_SUCCESS,
})
export const repairFaided = () => ({
    type: action_types.REPAIR_FAIDED,
})

export const getListRepairSuccess = (data) => ({
    type: action_types.GET_LIST_REPAIR_SUCCESS,
    data
})
export const getRepairSuccess = (data) => ({
    type: action_types.GET_REPAIR_SUCCESS,
    data
})
export const onChangeRepairRedux = (value, id) => ({
    type: action_types.ON_CHANGE_REPAIR,
    value,
    id,
})
export const setDataRepairRedux = (data) => ({
    type: action_types.SET_DATA_REPAIR,
    data,
})