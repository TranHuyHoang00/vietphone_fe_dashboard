import action_types from '@actions/action_types';
export const setDarkModeRedux = (data) => ({
    type: action_types.SET_DARK_MODE,
    data,
})