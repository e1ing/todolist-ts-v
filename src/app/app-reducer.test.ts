import { v1 } from "uuid"
import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",

    }
})

test ("correct error message should be send", () => {
  const endState = appReducer(startState, setAppErrorAC("some error"))
  expect(endState.error).toBe("some error");
})

test ("correct status should be send", () => {
    const endState = appReducer(startState, setAppStatusAC("loading"))
    expect(endState.status).toBe("loading");
})
