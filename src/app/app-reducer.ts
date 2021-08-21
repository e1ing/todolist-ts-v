import { Dispatch } from "redux"
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string|null,
    initialized: false
}

const appSlice = createSlice ({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{error:string|null}>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{status:RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppInitializedAC: (state, action: PayloadAction<{initialized:boolean}>) => {
            state.initialized = action.payload.initialized
        }
    }
})

export const appReducer = appSlice.reducer;
export const {setAppErrorAC, setAppInitializedAC, setAppStatusAC} = appSlice.actions


export const  initializeAppTC = () => (dispatch: Dispatch) => {
authAPI.me().then(res => {
    if(res.data.resultCode===0){
        dispatch(setIsLoggedInAC({value:true}))

    }else{

    }
    dispatch(setAppInitializedAC({initialized: true}))
})
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState