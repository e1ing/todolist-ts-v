import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import { useSelector } from 'react-redux'
import {AppRootStateType} from "./store";
import { RequestStatusType } from './app-reducer'

function App ({demo=false}:AppPropsType) {
const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status==="loading" && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;

type AppPropsType = {
    demo?: boolean
}
