import action_types from '../actions/action_types';

const initialState = {
    data_product: {},
    is_loading: false,
    is_edit: false,
}

const product_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PRODUCT_START:
            return {
                ...state,
                is_loading: true
            }
        case action_types.PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.PRODUCT_FAIDED:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                data_product: action.data
            }
        case action_types.ON_CHANGE_PRODUCT:
            let copyState = { ...state.data_product };
            if (action.type_onchange == 'input') { copyState[action.id] = action.event.target.value; }
            if (action.type_onchange == 'select') { copyState[action.id] = action.event; }
            return {
                ...state,
                data_product: {
                    ...copyState,
                }
            }
        case action_types.CLICK_EDIT_PRODUCT:
            return {
                ...state,
                is_edit: !state.is_edit
            }
        default:
            return state;
    }
}

export default product_reducers;