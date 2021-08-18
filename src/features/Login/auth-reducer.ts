import {Dispatch} from "redux"
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>|SetAppErrorAT|SetAppStatusAT
type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


//action creator

export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)

//thunk creators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(res=> {
            if (res.data.resultCode===0){
              dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            }else {
                handleServerAppError(res.data, dispatch)
            }
         })
        .catch((error)=> {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then(res=> {
            if (res.data.resultCode===0){
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            }else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error)=> {
            handleServerNetworkError(error, dispatch)
        })
}


