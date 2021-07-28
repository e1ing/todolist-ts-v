import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from '../api/todolists-api';

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {"API-KEY": "b00b044a-fabf-40f0-8522-d4dd85a812f0"}
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.createTodolist("Hi yoyo")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ""
        todolistAPI.deleteTodolist(todolistId)
            .then ((res)=> {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist("4545", "Hello")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTasks("2332342")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTask("2332342", "76467")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
