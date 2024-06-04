import action_types from '@actions/action_types';
import { getListPromotion, getDataPromotion, createPromotion, deletePromotion, editPromotion } from '@services/promotion_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListPromotionRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotionStart());
            let data = await getListPromotion(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListPromotionSuccess(data.data.data));
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
            dispatch(promotionStart());
            let data = await getDataPromotion(id);
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
            let data = await createPromotion(dataPromotion);
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
                let data = await deletePromotion(id);
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
                let data = await editPromotion(id, dataPromotion);
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
            let data = await editPromotion(id, dataPromotion);
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
    type: action_types.PROMOTION_START,
})
export const promotionSuccess = () => ({
    type: action_types.PROMOTION_SUCCESS,
})
export const promotionFaided = () => ({
    type: action_types.PROMOTION_FAIDED,
})

export const getListPromotionSuccess = (data) => ({
    type: action_types.GET_LIST_PROMOTION_SUCCESS,
    data
})
export const getPromotionSuccess = (data) => ({
    type: action_types.GET_PROMOTION_SUCCESS,
    data
})
export const onChangePromotionRedux = (value, id) => ({
    type: action_types.ON_CHANGE_PROMOTION,
    value,
    id,
})
export const setDataPromotionRedux = (data) => ({
    type: action_types.SET_DATA_PROMOTION,
    data,
})