import action_types from '@actions/action_types';
export const setLoginRedux = (data) => ({
    type: action_types.SET_LOGIN,
    data,
})