import actionTypes from '@actions/system/actionTypes';

const initialState = {
    loggedIn: false,
}

const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loggedIn: action.data,
            }
        default:
            return state;
    }
}

export default loginReducers;