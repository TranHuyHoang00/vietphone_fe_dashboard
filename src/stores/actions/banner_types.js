import action_types from '@actions/action_types';
import { getListBanner, getDataBanner, createBanner, deleteBanner, editBanner } from '@services/banner_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListBannerRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(bannerStart());
            const data = await getListBanner(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListBannerSuccess(data.data.data));
            } else {
                dispatch(bannerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(bannerFaided());
            showNotification(error);
        }
    }
}
export const getDataBannerRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(bannerStart());
            const data = await getDataBanner(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getBannerSuccess(data.data.data));
            } else {
                dispatch(bannerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(bannerFaided());
            showNotification(error);
        }
    }
}
export const createBannerRedux = (dataBanner) => {
    return async (dispatch, getState) => {
        try {
            dispatch(bannerStart());
            const data = await createBanner(dataBanner);
            if (data && data.data && data.data.success === 1) {
                dispatch(bannerSuccess());
                message.success('Thành công');
            } else {
                dispatch(bannerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(bannerFaided());
            showNotification(error);
        }
    }
}
export const deleteListBannerRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(bannerStart());
        for (const id of list_id) {
            try {
                const data = await deleteBanner(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(bannerFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(bannerSuccess());
    }
}
export const editListBannerRedux = (list_id, dataBanner) => {
    return async (dispatch, getState) => {
        dispatch(bannerStart());
        for (const id of list_id) {
            try {
                const data = await editBanner(id, dataBanner);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(bannerFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(bannerSuccess());
    }
}
export const editBannerRedux = (id, dataBanner) => {
    return async (dispatch, getState) => {
        try {
            dispatch(bannerStart());
            const data = await editBanner(id, dataBanner);
            if (data && data.data && data.data.success === 1) {
                dispatch(bannerSuccess());
                message.success('Thành công');
            } else {
                dispatch(bannerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(bannerFaided());
            showNotification(error);
        }
    }
}
export const bannerStart = () => ({
    type: action_types.BANNER_START,
})
export const bannerSuccess = () => ({
    type: action_types.BANNER_SUCCESS,
})
export const bannerFaided = () => ({
    type: action_types.BANNER_FAIDED,
})

export const getListBannerSuccess = (data) => ({
    type: action_types.GET_LIST_BANNER_SUCCESS,
    data
})
export const getBannerSuccess = (data) => ({
    type: action_types.GET_BANNER_SUCCESS,
    data
})
export const onChangeBannerRedux = (value, id) => ({
    type: action_types.ON_CHANGE_BANNER,
    value,
    id,
})
export const setDataBannerRedux = (data) => ({
    type: action_types.SET_DATA_BANNER,
    data,
})