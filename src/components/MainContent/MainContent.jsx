import React, { useState, useEffect } from 'react';
import classes from './MainContent.module.scss'

import InputBar from './InputBar/InputBar'
import ConversationSession from './ConversationSession/ConversationSession'
const MainContent = ()=>{
   
    return(
        <div  className={classes["main-container"]}>
            <ConversationSession />
            <InputBar />
        </div>
    )
}
export default MainContent