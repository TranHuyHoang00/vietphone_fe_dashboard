import action_types from '../actions/action_types';

const initialState = {
    data_permissions: [],
    data_permission: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const permission_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PERMISSION_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.PERMISSION_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_permissions: action.data.permissions,
                data_meta: action.data.metadata
            }
        case action_types.GET_PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_permission: action.data
            }
        case action_types.CREATE_PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_PERMISSION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_PERMISSION:
            return {
                ...state,
                data_permission: action.data,
            }
        case action_types.ON_CHANGE_PERMISSION:
            let copyState = { ...state.data_permission };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_permission: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default permission_reducers;