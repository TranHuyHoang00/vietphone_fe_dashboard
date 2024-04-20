import action_types from '@actions/action_types';

const initialState = {
    data_group_attributes: [],
    data_group_attribute: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const group_attribute_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.GROUP_ATTRIBUTE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.GROUP_ATTRIBUTE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_group_attributes: action.data.group_attributes,
                data_meta: action.data.metadata
            }
        case action_types.GET_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_group_attribute: action.data
            }
        case action_types.CREATE_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_GROUP_ATTRIBUTE:
            return {
                ...state,
                data_group_attribute: action.data,
            }
        case action_types.ON_CHANGE_GROUP_ATTRIBUTE:
            let copyState = { ...state.data_group_attribute };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_group_attribute: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default group_attribute_reducers;