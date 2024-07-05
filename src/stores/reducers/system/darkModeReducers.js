import actionTypes from '@actions/system/actionTypes';

const initialState = {
    darkMode: false,
}

const darkModeReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.data,
            }
        default:
            return state;
    }
}

export default darkModeReducers;