import action_types from '../actions/action_types';

const initialState = {
    data_categorys: [],
    data_category: { is_active: true },
    is_loading: false,
}

const category_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.CATEGORY_START:
            return {
                ...state,
                is_loading: true
            }
        case action_types.CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.CATEGORY_FAIDED:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.GET_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                is_loading: false,
                data_categorys: action.data
            }
        case action_types.ON_CHANGE_CATEGORY:
            let copyState = { ...state.data_category };
            if (action.type_onchange == 'input') { copyState[action.id] = action.event.target.value; }
            if (action.type_onchange == 'select') { copyState[action.id] = action.event; }
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