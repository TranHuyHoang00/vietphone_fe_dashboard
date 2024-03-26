import action_types from '../actions/action_types';

const initialState = {
    data_variant: {},
    is_loading: false,
    is_edit: false,
}

const variant_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.VARIANT_START:
            return {
                ...state,
                is_loading: true
            }
        case action_types.VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.VARIANT_FAIDED:
            return {
                ...state,
                is_loading: false,
            }
        case action_types.GET_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                data_variant: action.data
            }
        case action_types.ON_CHANGE_VARIANT:
            let copyState = { ...state.data_variant };
            if (action.type_onchange == 'input') { copyState[action.id] = action.event.target.value; }
            if (action.type_onchange == 'select') { copyState[action.id] = action.event; }
            return {
                ...state,
                data_variant: {
                    ...copyState,
                }
            }
        case action_types.CLICK_EDIT_VARIANT:
            return {
                ...state,
                is_edit: !state.is_edit
            }
        default:
            return state;
    }
}

export default variant_reducers;