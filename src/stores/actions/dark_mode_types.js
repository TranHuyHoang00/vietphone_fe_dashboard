import action_types from '@actions/action_types';
export const set_dark_mode_redux = (data) => ({
    type: action_types.SET_DARK_MODE,
    data,
})