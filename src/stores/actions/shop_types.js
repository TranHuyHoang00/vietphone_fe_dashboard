import action_types from '@actions/action_types';
import { getListShop, getDataShop, createShop, deleteShop, editShop } from '@services/shop_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListShopRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(shopStart());
            let data = await getListShop(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListShopSuccess(data.data.data));
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
            dispatch(shopStart());
            let data = await getDataShop(id);
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
            let data = await createShop(dataShop);
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
                let data = await deleteShop(id);
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
                let data = await editShop(id, dataShop);
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
            let data = await editShop(id, dataShop);
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
    type: action_types.SHOP_START,
})
export const shopSuccess = () => ({
    type: action_types.SHOP_SUCCESS,
})
export const shopFaided = () => ({
    type: action_types.SHOP_FAIDED,
})

export const getListShopSuccess = (data) => ({
    type: action_types.GET_LIST_SHOP_SUCCESS,
    data
})
export const getShopSuccess = (data) => ({
    type: action_types.GET_SHOP_SUCCESS,
    data
})
export const onChangeShopRedux = (value, id) => ({
    type: action_types.ON_CHANGE_SHOP,
    value,
    id,
})
export const setDataShopRedux = (data) => ({
    type: action_types.SET_DATA_SHOP,
    data,
})