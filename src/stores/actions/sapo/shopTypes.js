import actionTypes from './actionTypes';
import { getListShop, getDataShop, createShop, deleteShop, editShop } from '@services/sapo/shopServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListShopRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { shop } = getState();
            if (shop?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(shopStart());
            const data = await getListShop(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListShopSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(shopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(shopFaided());
            showNotification(error);
        }
    }
}
export const getDataShopRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { shop } = getState();
            const { dataShop } = shop || {};
            if (dataShop?.id === id) {
                return;
            }
            dispatch(shopStart());
            const data = await getDataShop(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getShopSuccess(data.data.data));
            } else {
                dispatch(shopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(shopFaided());
            showNotification(error);
        }
    }
}
export const createShopRedux = (dataShop) => {
    return async (dispatch, getState) => {
        try {
            dispatch(shopStart());
            const data = await createShop(dataShop);
            if (data && data.data && data.data.success === 1) {
                dispatch(shopSuccess());
                message.success('Thành công');
            } else {
                dispatch(shopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(shopFaided());
            showNotification(error);
        }
    }
}
export const deleteListShopRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(shopStart());
        for (const id of list_id) {
            try {
                const data = await deleteShop(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(shopFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(shopSuccess());
    }
}
export const editListShopRedux = (list_id, dataShop) => {
    return async (dispatch, getState) => {
        dispatch(shopStart());
        for (const id of list_id) {
            try {
                const data = await editShop(id, dataShop);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(shopFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(shopSuccess());
    }
}
export const editShopRedux = (id, dataShop) => {
    return async (dispatch, getState) => {
        try {
            dispatch(shopStart());
            const data = await editShop(id, dataShop);
            if (data && data.data && data.data.success === 1) {
                dispatch(shopSuccess());
                message.success('Thành công');
            } else {
                dispatch(shopFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(shopFaided());
            showNotification(error);
        }
    }
}
export const shopStart = () => ({
    type: actionTypes.SHOP_START,
})
export const shopSuccess = () => ({
    type: actionTypes.SHOP_SUCCESS,
})
export const shopFaided = () => ({
    type: actionTypes.SHOP_FAIDED,
})

export const getListShopSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_SHOP_SUCCESS,
    data,
    isRepeat,
})
export const getShopSuccess = (data) => ({
    type: actionTypes.GET_SHOP_SUCCESS,
    data
})
export const onChangeShopRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_SHOP,
    value,
    id,
})
export const setDataShopRedux = (data) => ({
    type: actionTypes.SET_DATA_SHOP,
    data,
})