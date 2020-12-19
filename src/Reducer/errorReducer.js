const initialState = {
    error:{
        errorMessage: null,
        errorType: null,
        errorShow: false,
        location: null
    },
    errorLoading: false
}

export default function(state= initialState, action){
    switch(action.type){
        case "SET_ERROR":
            return{
                ...state,
                error: action.payload,
                errorLoading: true
            }
        case "ERROR_DONE_LOADING":
            return{
                ...state,
                errorLoading: false
            }
        case "CLEAR_ERROR":
            return{
                ...state,
                error:{
                    errorMessage: null,
                    errorType: null,
                    errorShow: false,
                    location: null
                },
                errorLoading: true
            }
        default:
            return state;
    }

}