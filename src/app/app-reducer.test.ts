import { v1 } from "uuid"
import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer"

let startState: any

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    }
})

test ("correct error message should be send", () => {
  const endState = appReducer(startState, setAppErrorAC({error: "some error"}))
  expect(endState.error).toBe("some error");
})

test ("correct status should be send", () => {
    const endState = appReducer(startState, setAppStatusAC({status: "loading"}))
    expect(endState.status).toBe("loading");
})

