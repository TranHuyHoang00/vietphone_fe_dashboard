import action_types from '@actions/action_types';

const initialState = {
    data_groups: [],
    data_group: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const group_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.GROUP_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.GROUP_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_groups: action.data.groups,
                data_meta: action.data.metadata
            }
        case action_types.GET_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_group: action.data
            }
        case action_types.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_GROUP:
            return {
                ...state,
                data_group: action.data,
            }
        case action_types.ON_CHANGE_GROUP:
            let copyState = { ...state.data_group };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_group: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default group_reducers;