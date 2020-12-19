export const CheckError =(err)=>{
    if(err === "auth/user-not-found"){
        return {
            errorMessage: "User Not Found",
            errorType: "auth",
            location: "login",
            errorShow: true
        }
    }else if(err === "auth/wrong-password"){
        return {
            errorMessage: "Incorrect Password",
            errorType: "auth",
            location: "login",
            errorShow: true
        }
    }else if(err === "auth/email-already-in-use"){
        return {
            errorMessage: "Account Already Registered",
            errorType: "auth",
            location: "sign-up",
            errorShow: true
        }
    }else if(err === "auth/weak-password"){
        return {
            errorMessage: "Passwords should be at least 6 characters",
            errorType: "auth",
            location: "sign-up",
            errorShow: true
        }
    }
    else{
        return {
            errorMessage: "Error",
            errorType: "general",
            location: "general",
            errorShow: true
        }
    }

}

export const ClearErrors = ()=>{
    return{
        type: "CLEAR_ERROR"
    }
}

export const disableErrorsLoading = ()=>{
    return{
        type: "ERROR_DONE_LOADING"
    }
}