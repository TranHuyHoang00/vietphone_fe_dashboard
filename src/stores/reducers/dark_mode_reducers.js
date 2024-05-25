import action_types from '@actions/action_types';

const initialState = {
    dark_mode: false,
}

const dark_mode_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.SET_DARK_MODE:
            return {
                ...state,
                dark_mode: action.data,
            }
        default:
            return state;
    }
}

export default dark_mode_reducers;