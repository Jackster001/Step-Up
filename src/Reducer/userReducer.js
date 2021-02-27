const initialState = {
    profile:{},
    loadingProfile: false,
    loadingProfileAfterRemoval: false,
    editModalData: {        
        Title: "",
        Company: "",
        Description: "",
        Link: "",
        JobStatus: "Applied",
    },
    openingEditModal:false,
    contactLoading: false,
    addedContactLoading: false,
    contactList:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case "GET_PROFILE":
            return{
                ...state,
                profile: action.payload,
                loadingProfile: true,
                loginError:false
            }
        case "SET_CURRENT_USER":
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
        case "REMOVE_JOB":{
            return{
                ...state,
                profile: action.payload,
                loadingProfile: true
            }
        }
        case "GET_CONTACT":{
            return{
                ...state,
                contactList: action.payload,
                contactLoading: true
            }
        }
        case "ADD_CONTACT":{
            return{
                ...state,
                contactList: action.payload,
                addedContactLoading: true
            }
        }
        case "DISABLE_CONTACT_LOADING":{
            return{
                ...state,
                contactLoading: false,
                addedContactLoading: false
            }
        }
        case "DISABLE_USER_PROFILE_LOADING":
            return{
                ...state,
                loadingProfile:false,
            }
        case "LOGIN_ERROR":
            return{
                ...state,
                loginError:true
            }
        case "SET_EDIT_DATA":
            return{
                ...state,
                editModalData: action.payload.data,
                contactList: action.payload.result,
                openingEditModal: true
        }
        case "OPEN_EDIT_MODAL":
            return{
                ...state,
                openingEditModal: false
            }
        case "PROFILE_LOGOUT":
            return{
                ...state,
                profile: {}
            }
        default:
            return state;
    }

}