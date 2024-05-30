import action_types from '@actions/action_types';

const initialState = {
    loggedIn: false,
}

const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.SET_LOGIN:
            return {
                ...state,
                loggedIn: action.data,
            }
        default:
            return state;
    }
}

export default loginReducers;