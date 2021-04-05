const initialState = {
    tutorialLoading: false,
    tutorialSteps:{
        tutorialLink: false,
        addCardDuration: false
    }
}

export default function(state= initialState, action){
    switch(action.type){
        case "DISABLE_TUTORIAL_LOADING":
            return{
                ...state,
                tutorialLoading: false
            }
        case "TUTORIAL_UPDATE":
            return{
                ...state,
                tutorialSteps: action.payload,
                tutorialLoading: true
            }
        default:
            return state;
    }
}