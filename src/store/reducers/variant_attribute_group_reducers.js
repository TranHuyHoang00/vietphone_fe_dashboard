import action_types from '../actions/action_types';

const initialState = {
    data_variant_attribute_groups: [],
    data_variant_attribute_group: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const variant_attribute_group_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.VARIANT_ATTRIBUTE_GROUP_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.VARIANT_ATTRIBUTE_GROUP_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_variant_attribute_groups: action.data.varriant_attribute_groups,
                data_meta: action.data.metadata
            }
        case action_types.GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_variant_attribute_group: action.data
            }
        case action_types.CREATE_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_VARIANT_ATTRIBUTE_GROUP:
            return {
                ...state,
                data_variant_attribute_group: action.data,
            }
        case action_types.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP:
            let copyState = { ...state.data_variant_attribute_group };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_variant_attribute_group: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default variant_attribute_group_reducers;