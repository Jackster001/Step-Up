const initialState = {
    jobData: {
        jobStatuses: ["Applied", "Interview", "Offer", "Rejected"],
        Applied: [],
        Interview: [],
        Offer: [],
        Rejected: []
    },
    loadingData: false
}

export default function(state = initialState, action){
    switch(action.type){
        case "SET_JOBDATA":
            return {
                ...state,
                jobData: action.payload,
                loadingData: true
            }
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