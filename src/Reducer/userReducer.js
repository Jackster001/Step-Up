const initialState = {
    profile:{},
    loadingProfile: false
}

export default function(state= initialState, action){
    switch(action.type){
        case "SET_CURRENT_USER":
            console.log(action.payload)
            return{
                ...state,
                profile: action.payload,
                loadingProfile: true,
                loginError:false
            }
        case "USER_PROFILE_LOADING":
            return{
                ...state,
                loadingProfile: true
            }
        case "APPLY_JOB":
            return{
                ...state,
                profile: action.payload,
                loadingProfile: true
            }
        case "UPDATE_JOB":{
            return{
                ...state,
                profile: action.payload,
                loadingProfile: true
            }
        }
        case "DISABLE_USER_PROFILE_LOADING":
            return{
                ...state,
                loadingProfile:false
            }
        case "LOGIN_ERROR":
            return{
                ...state,
                loginError:true
            }
        default:
            return state;
    }

}