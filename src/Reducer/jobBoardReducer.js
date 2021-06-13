const initialState = {
    loadingData: false
}

export default function(state = initialState, action){
    switch(action.type){
        case "BOARD_DATA_LOADING":
            return{
                ...state,
                loadingData: true
            }
        case "BOARD_DATA_LOADED":
            return{
                ...state,
                loadingData: false
            }
        default:
            return state;
    }

}