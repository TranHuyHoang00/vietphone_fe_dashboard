import action_types from '../actions/action_types';

const initialState = {
    data_category_posts: [],
    data_category_post: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const category_post_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.CATEGORY_POST_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.CATEGORY_POST_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_category_posts: action.data.categories,
                data_meta: action.data.metadata
            }
        case action_types.GET_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_category_post: action.data
            }
        case action_types.CREATE_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_CATEGORY_POST:
            return {
                ...state,
                data_category_post: action.data,
            }
        case action_types.ON_CHANGE_CATEGORY_POST:
            let copyState = { ...state.data_category_post };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_category_post: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default category_post_reducers;