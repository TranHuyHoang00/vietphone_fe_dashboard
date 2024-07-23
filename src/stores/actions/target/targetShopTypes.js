import actionTypes from './actionTypes';
import { getListTargetShop, getDataTargetShop, createTargetShop, deleteTargetShop, editTargetShop } from '@services/target/targetShopServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTargetShopRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetShopStart());
            const data = await getListTargetShop(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListTargetShopSuccess(data.data.data));
            } else {
                dispatch(targetShopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetShopFaided());
            showNotification(error);
        }
    }
}
export const getDataTargetShopRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { targetShop } = getState();
            const { dataTargetShop } = targetShop || {};
            if (dataTargetShop?.id === id) {
                return;
            }
            dispatch(targetShopStart());
            const data = await getDataTargetShop(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getTargetShopSuccess(data.data.data));
            } else {
                dispatch(targetShopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetShopFaided());
            showNotification(error);
        }
    }
}
export const createTargetShopRedux = (dataTargetShop) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetShopStart());
            const data = await createTargetShop(dataTargetShop);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetShopSuccess());
            } else {
                dispatch(targetShopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetShopFaided());
            showNotification(error);
        }
    }
}
export const deleteListTargetShopRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(targetShopStart());
        for (const id of list_id) {
            try {
                const data = await deleteTargetShop(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetShopFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetShopSuccess());
    }
}
export const editListTargetShopRedux = (list_id, dataTargetShop) => {
    return async (dispatch, getState) => {
        dispatch(targetShopStart());
        for (const id of list_id) {
            try {
                const data = await editTargetShop(id, dataTargetShop);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetShopFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetShopSuccess());
    }
}
export const editTargetShopRedux = (id, dataTargetShop) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetShopStart());
            const data = await editTargetShop(id, dataTargetShop);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetShopSuccess());
                message.success('Thành công');
            } else {
                dispatch(targetShopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetShopFaided());
            showNotification(error);
        }
    }
}
export const targetShopStart = () => ({
    type: actionTypes.TARGET_SHOP_START,
})
export const targetShopSuccess = () => ({
    type: actionTypes.TARGET_SHOP_SUCCESS,
})
export const targetShopFaided = () => ({
    type: actionTypes.TARGET_SHOP_FAIDED,
})

export const getListTargetShopSuccess = (data) => ({
    type: actionTypes.GET_LIST_TARGET_SHOP_SUCCESS,
    data
})
export const getTargetShopSuccess = (data) => ({
    type: actionTypes.GET_TARGET_SHOP_SUCCESS,
    data
})
export const onChangeTargetShopRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_TARGET_SHOP,
    value,
    id,
})
export const setDataTargetShopRedux = (data) => ({
    type: actionTypes.SET_DATA_TARGET_SHOP,
    data,
})