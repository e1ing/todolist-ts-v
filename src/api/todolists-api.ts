import axios from "axios";

const  instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {"API-KEY": "b00b044a-fabf-40f0-8522-d4dd85a812f0"}
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>("todo-lists",{title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`,
            {title: title})
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string) {
        return instance.post<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    updateTask(todolistId: string, taskId: string) {
        return instance.put<GetTasksResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

//types
export type TodolistType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType ={
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}