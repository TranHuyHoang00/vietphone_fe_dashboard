import action_types from '@actions/action_types';

const initialState = {
    data_attributes: [],
    data_attribute: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const attribute_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ATTRIBUTE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.ATTRIBUTE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_attributes: action.data.attributes,
                data_meta: action.data.metadata
            }
        case action_types.GET_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_attribute: action.data
            }
        case action_types.CREATE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_ATTRIBUTE:
            return {
                ...state,
                data_attribute: action.data,
            }
        case action_types.ON_CHANGE_ATTRIBUTE:
            let copyState = { ...state.data_attribute };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_attribute: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default attribute_reducers;