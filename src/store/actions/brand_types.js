import action_types from '@actions/action_types';
import { getListBrand, getDataBrand, createBrand, deleteBrand, editBrand } from '@services/brand_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const getListBrandRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await getListBrand(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_brand_success(data.data.data));
            } else {
                dispatch(brand_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const getDataBrandRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await getDataBrand(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_brand_success(data.data.data));
            } else {
                dispatch(brand_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const createBrandRedux = (dataBrand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await createBrand(dataBrand);
            if (data && data.data && data.data.success === 1) {
                dispatch(brand_success());
                message.success('Thành công');
            } else {
                dispatch(brand_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const deleteListBrandRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(brand_start());
        for (const id of list_id) {
            try {
                let data = await deleteBrand(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(brand_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(brand_success());
    }
}
export const editListBrandRedux = (list_id, dataBrand) => {
    return async (dispatch, getState) => {
        dispatch(brand_start());
        for (const id of list_id) {
            try {
                let data = await editBrand(id, dataBrand);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(brand_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(brand_success());
    }
}
export const editBrandRedux = (id, dataBrand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await editBrand(id, dataBrand);
            if (data && data.data && data.data.success === 1) {
                dispatch(brand_success());
                message.success('Thành công');
            } else {
                dispatch(brand_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const brand_start = () => ({
    type: action_types.BRAND_START,
})
export const brand_success = () => ({
    type: action_types.BRAND_SUCCESS,
})
export const brand_faided = () => ({
    type: action_types.BRAND_FAIDED,
})

export const get_list_brand_success = (data) => ({
    type: action_types.GET_LIST_BRAND_SUCCESS,
    data
})
export const get_brand_success = (data) => ({
    type: action_types.GET_BRAND_SUCCESS,
    data
})
export const onChangeBrandRedux = (value, id) => ({
    type: action_types.ON_CHANGE_BRAND,
    value,
    id,
})
export const setDataBrandRedux = (data) => ({
    type: action_types.SET_DATA_BRAND,
    data,
})