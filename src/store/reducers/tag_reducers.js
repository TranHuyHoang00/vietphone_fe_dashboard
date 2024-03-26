import action_types from '../actions/action_types';

const initialState = {
    data_tags: [],
    data_tag: { is_active: true },
    is_loading: false,
}

const tag_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TAG_START:
            return {
                ...state,
                is_loading: true
            }
        case action_types.TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.TAG_FAIDED:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.GET_LIST_TAG_SUCCESS:
            return {
                ...state,
                is_loading: false,
                data_tags: action.data
            }
        case action_types.ON_CHANGE_TAG:
            let copyState = { ...state.data_tag };
            if (action.type_onchange == 'input') { copyState[action.id] = action.event.target.value; }
            if (action.type_onchange == 'select') { copyState[action.id] = action.event; }
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