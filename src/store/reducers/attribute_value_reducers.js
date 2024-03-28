import action_types from '../actions/action_types';

const initialState = {
    data_attribute_values: [],
    data_attribute_value: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const attribute_value_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ATTRIBUTE_VALUE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.ATTRIBUTE_VALUE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_attribute_values: action.data.attribute_values,
                data_meta: action.data.metadata
            }
        case action_types.GET_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_attribute_value: action.data
            }
        case action_types.CREATE_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_ATTRIBUTE_VALUE:
            return {
                ...state,
                data_attribute_value: action.data,
            }
        case action_types.ON_CHANGE_ATTRIBUTE_VALUE:
            let copyState = { ...state.data_attribute_value };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_attribute_value: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default attribute_value_reducers;