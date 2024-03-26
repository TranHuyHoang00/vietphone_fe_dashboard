import action_types from '../actions/action_types';

const initialState = {
    data_brands: [],
    data_brand: { is_active: true },
    is_loading: false,
}

const brand_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.BRAND_START:
            return {
                ...state,
                is_loading: true
            }
        case action_types.BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.BRAND_FAIDED:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.GET_LIST_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                data_brands: action.data
            }
        case action_types.ON_CHANGE_BRAND:
            let copyState = { ...state.data_brand };
            if (action.type_onchange == 'input') { copyState[action.id] = action.event.target.value; }
            if (action.type_onchange == 'select') { copyState[action.id] = action.event; }
            return {
                ...state,
                data_brand: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default brand_reducers;