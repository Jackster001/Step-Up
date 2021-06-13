const initialState = {
    jobViewTabNumber: 0,
    settingNumber: false
}

export default function(state = initialState, action){
    switch(action.type){
        case "SET_JOB_VIEW_TAB_NUMBER":
            return {
                ...state,
                jobViewTabNumber: action.payload,
                settingNumber: true
            }
        case "GET_TAB_NUMBER":
            return{
                ...state,
                settingNumber: true
            }
        case "TAB_NUMBER_SET":
            return{
                ...state,
                settingNumber: false
            }
        default:
            return state;
    }

}