import action_types from '@actions/action_types';
import { getListProvince, getListDistrict, getListWard, getProvince, getDistrict, getWard } from '@services/address_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListProvinceRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(addressStart());
            let data = await getListProvince(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListProvinceSuccess(data.data.data));
            } else {
                dispatch(addressFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(addressFaided());
            showNotification(error);
        }
    }
}
export const getDataBrandRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(addressStart());
            let data = await getProvince(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getProvinceSuccess(data.data.data));
            } else {
                dispatch(addressFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(addressFaided());
            showNotification(error);
        }
    }
}
export const getListDistrictRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(addressStart());
            let data = await getListDistrict(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListDistrictSuccess(data.data.data));
            } else {
                dispatch(addressFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(addressFaided());
            showNotification(error);
        }
    }
}
export const getDataDistrictRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(addressStart());
            let data = await getDistrict(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getDistrictSuccess(data.data.data));
            } else {
                dispatch(addressFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(addressFaided());
            showNotification(error);
        }
    }
}
export const getListWardceRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(addressStart());
            let data = await getListWard(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListWardSuccess(data.data.data));
            } else {
                dispatch(addressFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(addressFaided());
            showNotification(error);
        }
    }
}
export const getDataWardRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(addressStart());
            let data = await getWard(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getWardSuccess(data.data.data));
            } else {
                dispatch(addressFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(addressFaided());
            showNotification(error);
        }
    }
}
export const addressStart = () => ({
    type: action_types.ADDRESS_START,
})
export const addressSuccess = () => ({
    type: action_types.ADDRESS_SUCCESS,
})
export const addressFaided = () => ({
    type: action_types.ADDRESS_FAIDED,
})

export const getListProvinceSuccess = (data) => ({
    type: action_types.GET_LIST_PROVINCE_SUCCESS,
    data
})
export const getProvinceSuccess = (data) => ({
    type: action_types.GET_PROVINCE_SUCCESS,
    data
})
export const setDataProvinceRedux = (data) => ({
    type: action_types.SET_DATA_PROVINCE,
    data,
})

export const getListDistrictSuccess = (data) => ({
    type: action_types.GET_LIST_DISTRICT_SUCCESS,
    data
})
export const getDistrictSuccess = (data) => ({
    type: action_types.GET_DISTRICT_SUCCESS,
    data
})
export const setDataDistrictRedux = (data) => ({
    type: action_types.SET_DATA_DISTRICT,
    data,
})

export const getListWardSuccess = (data) => ({
    type: action_types.GET_LIST_WARD_SUCCESS,
    data
})
export const getWardSuccess = (data) => ({
    type: action_types.GET_WARD_SUCCESS,
    data
})
export const setDataWardRedux = (data) => ({
    type: action_types.SET_DATA_WARD,
    data,
})
