import actionTypes from './actionTypes';
import { getListBrand, getDataBrand, createBrand, deleteBrand, editBrand } from '@services/website/brandServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListBrandRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brandStart());
            let data = await getListBrand(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListBrandSuccess(data.data.data));
            } else {
                dispatch(brandFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brandFaided());
            showNotification(error);
        }
    }
}
export const getDataBrandRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brandStart());
            let data = await getDataBrand(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getBrandSuccess(data.data.data));
            } else {
                dispatch(brandFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brandFaided());
            showNotification(error);
        }
    }
}
export const createBrandRedux = (dataBrand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brandStart());
            let data = await createBrand(dataBrand);
            if (data && data.data && data.data.success === 1) {
                dispatch(brandSuccess());
                message.success('Thành công');
            } else {
                dispatch(brandFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brandFaided());
            showNotification(error);
        }
    }
}
export const deleteListBrandRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(brandStart());
        for (const id of list_id) {
            try {
                let data = await deleteBrand(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(brandFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(brandSuccess());
    }
}
export const editListBrandRedux = (list_id, dataBrand) => {
    return async (dispatch, getState) => {
        dispatch(brandStart());
        for (const id of list_id) {
            try {
                let data = await editBrand(id, dataBrand);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(brandFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(brandSuccess());
    }
}
export const editBrandRedux = (id, dataBrand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brandStart());
            let data = await editBrand(id, dataBrand);
            if (data && data.data && data.data.success === 1) {
                dispatch(brandSuccess());
                message.success('Thành công');
            } else {
                dispatch(brandFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(brandFaided());
            showNotification(error);
        }
    }
}
export const brandStart = () => ({
    type: actionTypes.BRAND_START,
})
export const brandSuccess = () => ({
    type: actionTypes.BRAND_SUCCESS,
})
export const brandFaided = () => ({
    type: actionTypes.BRAND_FAIDED,
})

export const getListBrandSuccess = (data) => ({
    type: actionTypes.GET_LIST_BRAND_SUCCESS,
    data
})
export const getBrandSuccess = (data) => ({
    type: actionTypes.GET_BRAND_SUCCESS,
    data
})
export const onChangeBrandRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_BRAND,
    value,
    id,
})
export const setDataBrandRedux = (data) => ({
    type: actionTypes.SET_DATA_BRAND,
    data,
})