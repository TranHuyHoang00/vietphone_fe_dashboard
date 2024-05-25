import action_types from '@actions/action_types';

const initialState = {
    dataVariantAttributeGroups: [],
    dataVariantAttributeGroup: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const variant_attribute_group_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.VARIANT_ATTRIBUTE_GROUP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.VARIANT_ATTRIBUTE_GROUP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariantAttributeGroups: action.data.varriant_attribute_groups,
                dataMeta: action.data.metadata
            }
        case action_types.GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariantAttributeGroup: action.data
            }
        case action_types.CREATE_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_VARIANT_ATTRIBUTE_GROUP:
            return {
                ...state,
                dataVariantAttributeGroup: action.data,
            }
        case action_types.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP:
            let copyState = { ...state.dataVariantAttributeGroup };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataVariantAttributeGroup: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default variant_attribute_group_reducers;