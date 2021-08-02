

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string|null
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type ActionsType = SetAppErrorAT | SetAppStatusAT
export type InitialStateType = typeof initialState