import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "active"},
            {id: todolistId2, title: "What to buy", filter: "completed"}
        ]);

    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer,
    {[todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ]
    });


    let removeTodolist = (todolistId: string) => {
        dispatchTodolistsReducer (removeTodolistAC(todolistId))
        dispatchTasksReducer (removeTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        dispatchTodolistsReducer(addTodolistAC(title))
        dispatchTasksReducer(addTodolistAC(title))
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchTodolistsReducer(changeTodolistTitleAC(id, newTitle))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchTodolistsReducer (changeTodolistFilterAC(todolistId, value))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchTasksReducer (removeTaskAC(id, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasksReducer (addTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchTasksReducer (changeTaskTitleAC(taskId, newTitle, todolistId))
    }




    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                        {
                            todolists.map((tl) => {

                                let tasksForTodolist = tasksObj[tl.id];

                                if (tl.filter === "completed") {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                                }
                                if (tl.filter === "active") {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                                }

                                return <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    /*removeTask={removeTask}*/
                                    changeFilter={changeFilter}
                                  /*  addTask={addTask}*/
                                /*    changeTaskStatus={changeStatus}*/
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    /*changeTaskTitle={changeTaskTitle}*/
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                                    </Paper>
                                </Grid>
                            })
                        }
                </Grid>

            </Container>
        </div>
    );
}


export default AppWithReducers;
