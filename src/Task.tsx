import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: TaskType
    todolistId: string

}
export const Task: React.FC<TaskPropsType> = React.memo( (
    {task,todolistId}) => {
    const dispatch = useDispatch();

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) =>
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId)), [dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) =>
        dispatch(changeTaskStatusAC(id, isDone, todolistId)), [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) =>
        dispatch(removeTaskAC(id, todolistId)), [dispatch])




    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={changeTaskStatus}
        />

        <EditableSpan title={task.title} onChange={changeTaskTitle} />
        <IconButton onClick={removeTask}>
            <Delete />
        </IconButton>
    </div>
})