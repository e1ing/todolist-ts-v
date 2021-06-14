import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activeEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField value={title} onBlur={activeViewMode} autoFocus onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
})