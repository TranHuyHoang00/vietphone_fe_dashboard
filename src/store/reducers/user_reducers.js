import action_types from '@actions/action_types';

const initialState = {
    data_users: [],
    data_user: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const user_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.USER_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.USER_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_users: action.data.users,
                data_meta: action.data.metadata
            }
        case action_types.GET_USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_user: action.data
            }
        case action_types.CREATE_USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_USER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_USER:
            return {
                ...state,
                data_user: action.data,
            }
        case action_types.ON_CHANGE_USER:
            let copyState = { ...state.data_user };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_user: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default user_reducers;