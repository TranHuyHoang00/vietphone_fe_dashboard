import actionTypes from '../actions/actionTypes';

const initialState = {
    data_form_infor: null,
}

const dataReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_FORM_INFOR:
            return {
                ...state,
                data_form_infor: action.data
            }
        default:
            return state;
    }
}

export default dataReducers;