import action_types from '../actions/action_types';

const initialState = {
    data_variant_attribute_groups: [],
    data_variant_attribute_group: {},
    is_loading: false,
}

const variant_attribute_group_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.VARIANT_ATTRIBUTE_GROUP_START:
            return {
                ...state,
                is_loading: true
            }
        case action_types.VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.VARIANT_ATTRIBUTE_GROUP_FAIDED:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                is_loading: false,
                data_variant_attribute_groups: action.data
            }
        case action_types.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP:
            let copyState = { ...state.data_variant_attribute_group };
            if (action.type_onchange == 'input') { copyState[action.id] = action.event.target.value; }
            if (action.type_onchange == 'select') { copyState[action.id] = action.event; }
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