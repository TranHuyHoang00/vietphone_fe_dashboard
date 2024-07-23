import actionTypes from './actionTypes';
import { getListPromotion, getDataPromotion, createPromotion, deletePromotion, editPromotion } from '@services/website/promotionServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListPromotionRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { promotion } = getState();
            if (promotion?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(promotionStart());
            const data = await getListPromotion(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListPromotionSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(promotionFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotionFaided());
            showNotification(error);
        }
    }
}
export const getDataPromotionRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { promotion } = getState();
            const { dataPromotion } = promotion || {};
            if (String(dataPromotion?.id) === id) {
                return;
            }
            dispatch(promotionStart());
            const data = await getDataPromotion(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getPromotionSuccess(data.data.data));
            } else {
                dispatch(promotionFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotionFaided());
            showNotification(error);
        }
    }
}
export const createPromotionRedux = (dataPromotion) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotionStart());
            const data = await createPromotion(dataPromotion);
            if (data && data.data && data.data.success === 1) {
                dispatch(promotionSuccess());
                message.success('Thành công');
            } else {
                dispatch(promotionFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotionFaided());
            showNotification(error);
        }
    }
}
export const deleteListPromotionRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(promotionStart());
        for (const id of list_id) {
            try {
                const data = await deletePromotion(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(promotionFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(promotionSuccess());
    }
}
export const editListPromotionRedux = (list_id, dataPromotion) => {
    return async (dispatch, getState) => {
        dispatch(promotionStart());
        for (const id of list_id) {
            try {
                const data = await editPromotion(id, dataPromotion);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(promotionFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(promotionSuccess());
    }
}
export const editPromotionRedux = (id, dataPromotion) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotionStart());
            const data = await editPromotion(id, dataPromotion);
            if (data && data.data && data.data.success === 1) {
                dispatch(promotionSuccess());
                message.success('Thành công');
            } else {
                dispatch(promotionFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotionFaided());
            showNotification(error);
        }
    }
}
export const promotionStart = () => ({
    type: actionTypes.PROMOTION_START,
})
export const promotionSuccess = () => ({
    type: actionTypes.PROMOTION_SUCCESS,
})
export const promotionFaided = () => ({
    type: actionTypes.PROMOTION_FAIDED,
})

export const getListPromotionSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_PROMOTION_SUCCESS,
    data,
    isRepeat
})
export const getPromotionSuccess = (data) => ({
    type: actionTypes.GET_PROMOTION_SUCCESS,
    data
})
export const onChangePromotionRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_PROMOTION,
    value,
    id,
})
export const setDataPromotionRedux = (data) => ({
    type: actionTypes.SET_DATA_PROMOTION,
    data,
})