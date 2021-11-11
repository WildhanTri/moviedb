import { SET_SEARCH_HEADER, SET_SEARCH_RESULT } from "./actions"


const initialState = {
    searchInputHeader: '',
    searchMoviesResult: [],
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_HEADER:
            return {
                ...state,
                searchInputHeader: action.payload
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                searchMoviesResult: action.payload
            }
        default:
            return state
    }
}

export default AppReducer
