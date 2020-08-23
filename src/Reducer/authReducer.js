const initialState = {
    isAuthenticated: false,
    token: "",
    loginError:false
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