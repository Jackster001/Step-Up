const initialState = {
    isAuthenticated: false,
    token: "",
    loginError:false,
    reset: false
}

export default function(state= initialState, action){
    switch(action.type){
        // case "AUTHENTICATE_USER":
        //     return{
        //         ...state,
        //         isAuthenticated: true,
        //         loginError:false
        //     }
        case "SET_TOKEN":
            return{
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loginError:false
            }
        case "SET_AUTH":
            return{
                ...state,
                isAuthenticated: action.payload
            }
        case "PASSWORD_RESET":
            return{
                ...state,
                reset: true
            }
        case "PASSWORD_RESET_OFF":
            return{
                ...state,
                reset: false
            }
        case "LOGIN_ERROR":
            return{
                ...state,
                isAuthenticated: false,
                loginError:true
            }
        case "LOG_OUT":{
            return{
                ...state,
                isAuthenticated: false,
                token:null
            }
        }
        default:
            return state;
    }

}