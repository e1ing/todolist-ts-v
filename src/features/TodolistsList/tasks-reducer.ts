import {
    addTodolistAC,
    AddTodolistActionType, removeTodolistAC,
    RemoveTodolistActionType, setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {initializeAppTC, setAppStatusAC} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        addTaskAC: (state, action: PayloadAction<TaskType>) => {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel};
            }
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) =>  {
        builder.addCase(addTodolistAC, (state, action) => {
state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
    }
})

export const tasksReducer = tasksSlice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = tasksSlice.actions
// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({tasks, todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC({taskId, todolistId})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId, domainModel, todolistId})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
