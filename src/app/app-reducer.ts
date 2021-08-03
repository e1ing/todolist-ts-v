import { Dispatch } from "redux"
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string|null,
    initialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, initialized: action.value}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
export const  initializeAppTC = () => (dispatch: Dispatch) => {
authAPI.me().then(res => {
    if(res.data.resultCode===0){
        dispatch(setIsLoggedInAC(true))

    }else{

    }
    dispatch(setAppInitializedAC(true))
})
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type ActionsType = SetAppErrorAT | SetAppStatusAT| ReturnType<typeof setAppInitializedAC>
export type InitialStateType = typeof initialState