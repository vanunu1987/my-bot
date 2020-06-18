import React,{useEffect,useState,useContext} from 'react'
import classes from './ConversationSession.module.scss'

import { QuestionContext } from '../../../App'
import AnswerCmp from './AnswerCmp/AnswerCmp'
import QuestionCmp from './QuestionCmp/QuestionCmp'


const ConversationSession = () => {

    const questionContext = useContext(QuestionContext)
    useEffect (()=>{
        const dataRow = questionContext.questionState.slice(0,1)
        const {question,ans} = dataRow[0]
        // questionContext.questionDispatch('shift')
        setQuestionArr([question])
        setAnswerArr([ans])
    },[])

    const [translateHeight,setTranslateHeight] = useState(0)
    const handleUpdateLocattion = ()=>{
        setTranslateHeight(translateHeight-120)
    }
    const styles = { 
        transform: `translate(0px, ${translateHeight}px)` ,
        transition: 'transform .6s 1s'
    };

    const handleButtonClick = (goTo)=>{
        if (questionContext.questionState.length === 0) return
        console.log(questionContext.questionState);
        
        const newRow = questionContext.questionState.find(que=>que.id === goTo)
        console.log('newRow',newRow);
        
        const {question,ans,id} = newRow
        const idArr = questionArr.map(que=>que.id)
        console.log('idArr',idArr);
        
        questionContext.questionDispatch({action:'changeTrans',data:{id:idArr}})
        handleUpdateLocattion()
        setCurrentQuestion(id)
        setQuestionArr(questionArr=>[...questionArr,question])
        setAnswerArr(answerArr=>[...answerArr,ans])
        console.log('currentQuestion',currentQuestion,' id: ', id);
    } 
    const [questionArr,setQuestionArr] = useState([]);
    const [answerArr,setAnswerArr] = useState([]);
    const [currentQuestion,setCurrentQuestion] = useState(1);
    const questionArrToRender = questionArr.map((question,idx)=>question && <QuestionCmp question={question} key={idx} buttonClick={(goTo)=>handleButtonClick(goTo)} id={currentQuestion}/>) 
    const answerArrToRender = answerArr.map((answer,idx)=><AnswerCmp key={idx} buttonClick={(goTo)=>handleButtonClick(goTo)} ansArr={answer} id={currentQuestion} />) 
    return(
        <div className="main-container">
            {questionArrToRender}
            {answerArrToRender}
        </div>
    )
}

export default ConversationSession