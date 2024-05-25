import action_types from '@actions/action_types';
import { getListBanner, getDataBanner, createBanner, delete_banner, editBanner } from '@services/banner_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListBannerRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await getListBanner(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_banner_success(data.data.data));
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            showNotification(error);
        }
    }
}
export const getDataBannerRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await getDataBanner(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_banner_success(data.data.data));
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            showNotification(error);
        }
    }
}
export const createBannerRedux = (dataBanner) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await createBanner(dataBanner);
            if (data && data.data && data.data.success === 1) {
                dispatch(banner_success());
                message.success('Thành công');
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            showNotification(error);
        }
    }
}
export const deleteListBannerRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(banner_start());
        for (const id of list_id) {
            try {
                let data = await delete_banner(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(banner_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(banner_success());
    }
}
export const editListBannerRedux = (list_id, dataBanner) => {
    return async (dispatch, getState) => {
        dispatch(banner_start());
        for (const id of list_id) {
            try {
                let data = await editBanner(id, dataBanner);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(banner_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(banner_success());
    }
}
export const editBannerRedux = (id, dataBanner) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await editBanner(id, dataBanner);
            if (data && data.data && data.data.success === 1) {
                dispatch(banner_success());
                message.success('Thành công');
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            showNotification(error);
        }
    }
}
export const banner_start = () => ({
    type: action_types.BANNER_START,
})
export const banner_success = () => ({
    type: action_types.BANNER_SUCCESS,
})
export const banner_faided = () => ({
    type: action_types.BANNER_FAIDED,
})

export const get_list_banner_success = (data) => ({
    type: action_types.GET_LIST_BANNER_SUCCESS,
    data
})
export const get_banner_success = (data) => ({
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