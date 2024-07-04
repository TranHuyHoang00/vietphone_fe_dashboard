import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataVariantAttributeGroups: [],
    dataVariantAttributeGroup: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const variantAttributeGroupReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VARIANT_ATTRIBUTE_GROUP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.VARIANT_ATTRIBUTE_GROUP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariantAttributeGroups: action.data.varriant_attribute_groups,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariantAttributeGroup: action.data
            }
        case actionTypes.CREATE_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_VARIANT_ATTRIBUTE_GROUP:
            return {
                ...state,
                dataVariantAttributeGroup: action.data,
            }
        case actionTypes.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP:
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

export default variantAttributeGroupReducers;