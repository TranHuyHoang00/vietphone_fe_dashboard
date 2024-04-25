import action_types from '@actions/action_types';

const initialState = {
    data_permissions: [],
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

        default:
            return state;
    }
}

export default permission_reducers;