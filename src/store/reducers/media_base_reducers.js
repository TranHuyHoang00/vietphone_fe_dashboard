import action_types from '../actions/action_types';

const initialState = {
    data_media_bases: [],
    data_media_base: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const media_base_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.MEDIA_BASE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.MEDIA_BASE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_media_bases: action.data.media_bases,
                data_meta: action.data.metadata
            }
        case action_types.GET_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_media_base: action.data
            }
        case action_types.CREATE_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_MEDIA_BASE:
            return {
                ...state,
                data_media_base: action.data,
            }
        case action_types.ON_CHANGE_MEDIA_BASE:
            let copyState = { ...state.data_media_base };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_media_base: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default media_base_reducers;