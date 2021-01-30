const initialState = {
    isAuthenticated: false,
    token: "",
    loginError:false,
    reset: false,
    authLoading: false,
    signUpEmail: "",
    signUpEmailSent: false
}

export default function(state= initialState, action){
    switch(action.type){
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
                isAuthenticated: action.payload,
                authLoading: true
            }
        case "AUTH_DONE":
            return{
                ...state,
                authLoading: false
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
        case "SET_SIGNUP_EMAIL":
            return{
                ...state,
                signUpEmail: action.payload,
                signUpEmailSent: true
        }
        case "DISABLE_SET_SIGNUP_EMAIL":
            return{
                ...state,
                signUpEmailSent: false
        }
        case "CLEAR_SIGNUP_EMAIL":
            return{
                ...state,
                signUpEmail:""
            }
        default:
            return state;
    }

}