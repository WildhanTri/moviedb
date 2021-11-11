import { SET_SEARCH_HEADER } from "./actions"


const initialState = {
    searchInputHeader: ''
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_HEADER:
            return {
                ...state,
                searchInputHeader: action.payload
            }
        default:
            return state
    }
}

export default AppReducer
