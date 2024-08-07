import actionTypes from './actionTypes';
import { getListRepair, getDataRepair, createRepair, deleteRepair, editRepair } from '@services/website/repairServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListRepairRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { repair } = getState();
            if (repair?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(repairStart());
            const data = await getListRepair(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListRepairSuccess(data.data.data, dataFilter?.limit));
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
            const { repair } = getState();
            const { dataRepair } = repair || {};
            if (dataRepair?.id === id) {
                return;
            }
            dispatch(repairStart());
            const data = await getDataRepair(id);
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
            const data = await createRepair(dataRepair);
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
                const data = await deleteRepair(id);
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
                const data = await editRepair(id, dataRepair);
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
            const data = await editRepair(id, dataRepair);
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
    type: actionTypes.REPAIR_START,
})
export const repairSuccess = () => ({
    type: actionTypes.REPAIR_SUCCESS,
})
export const repairFaided = () => ({
    type: actionTypes.REPAIR_FAIDED,
})

export const getListRepairSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_REPAIR_SUCCESS,
    data,
    isRepeat,
})
export const getRepairSuccess = (data) => ({
    type: actionTypes.GET_REPAIR_SUCCESS,
    data
})
export const onChangeRepairRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_REPAIR,
    value,
    id,
})
export const setDataRepairRedux = (data) => ({
    type: actionTypes.SET_DATA_REPAIR,
    data,
})