import action_types from '@actions/action_types';

const initialState = {
    data_categorys: [],
    data_category: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const category_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.CATEGORY_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.CATEGORY_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_categorys: action.data.categories,
                data_meta: action.data.metadata
            }
        case action_types.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_category: action.data
            }
        case action_types.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_CATEGORY:
            return {
                ...state,
                data_category: action.data,
            }
        case action_types.ON_CHANGE_CATEGORY:
            let copyState = { ...state.data_category };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_category: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default category_reducers;