import action_types from '@actions/action_types';

const initialState = {
    data_tags: [],
    data_tag: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const tag_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TAG_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.TAG_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_tags: action.data.tags,
                data_meta: action.data.metadata
            }
        case action_types.GET_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_tag: action.data
            }
        case action_types.CREATE_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_TAG:
            return {
                ...state,
                data_tag: action.data,
            }
        case action_types.ON_CHANGE_TAG:
            let copyState = { ...state.data_tag };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_tag: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default tag_reducers;