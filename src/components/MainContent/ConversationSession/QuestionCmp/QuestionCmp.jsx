import React, { useState, useEffect, useContext } from 'react';
import classes from './QuestionCmp.module.scss'
import {QuestionContext} from '../../../../App'

import Loader from 'react-loader-spinner'


  

const QuestionCmp = ({question,id,buttonClick}) => {

  const questionContext = useContext(QuestionContext) 
  const [isMessageActive, setMessage] = useState(false);
//   const [trans, setTrans] = useState(questionContext.questionState[question.id-1].question.trans)
  const style = {
    transform: `translate(0px, ${questionContext.questionState[question.id-1].question.trans}px)`
  }
  useEffect(() => {
    console.log('trans change!! ',questionContext.questionState[question.id-1].question.trans);
    
  },[questionContext.questionState[question.id-1].question.trans])
  useEffect(() => {
    setTimeout(()=>{
        setMessage(true)
        if (id === 1  ) {
                buttonClick(2)
        }
    },2000)
  },[question]);
  const message = isMessageActive ? <p>{question.val}</p> : ''
  const loader = !isMessageActive && <Loader
  type="Bars"
  color="#00BFFF"
  height={40}
  width={20}
  timeout={2000} //3 secs
  />
  
    return (
        <div style={style} className={classes["main-container"]}>
            <div className={classes["bot-img"]}></div>
            <div className={classes["message-container"]}>
                {loader}
                {message}
            </div>
        </div>
    )
}

export default QuestionCmp