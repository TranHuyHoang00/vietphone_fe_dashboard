import action_types from '@actions/action_types';

const initialState = {
    darkMode: false,
}

const darkModeReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.data,
            }
        default:
            return state;
    }
}

export default darkModeReducers;