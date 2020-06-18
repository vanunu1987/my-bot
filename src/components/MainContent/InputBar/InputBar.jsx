import React from 'react'
import classes from './InputBar.module.scss'

const InputBar = (props) => {
    return (
        <div className={classes["input-container"]}>
        <input className={classes["input-style"]} type="text"   />
        </div>
    )
}

export default InputBar