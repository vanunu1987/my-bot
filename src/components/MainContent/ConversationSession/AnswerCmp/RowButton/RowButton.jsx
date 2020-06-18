import React,{useEffect, useState,useRef,useContext} from 'react'
import classes from './RowButton.module.scss'
import { QuestionContext } from '../../../../../App'

const RowButton = ({buttonClick,rowButton,id,closeCmp}) =>{
    const questionContext = useContext(QuestionContext)
    const [translateHeight,setTranslateHeight] = useState(0)
    const [translateWidth,setTranslateWidth] = useState(0)
    const [isContainerActive,setIsContainerActive] = useState(true)
    const buttonRef = useRef([]);
    const [visible,setVisible] = useState({0: true,
                                           1: true,
                                           2:true,
                                           3:true})
    
    const [isTranslateHeight,setIsTranslateHeight] = useState(false)
   
    // const style = { 
    //     transform: `translate(${translateWidth}px, ${questionContext.questionState[id-1].ans[ansIdx].transHeight}px)` ,
    // };                                       
    const handleClick = (goTo,idx,ansId,id) =>{
        buttonClick(goTo)
        const falseVisibleObj = {0: false,1: false,2:false,3:false}
        setVisible({...falseVisibleObj, [idx]: true})
        setIsTranslateHeight(true)
        const el = buttonRef.current[idx];
        console.log(el);
        
        el.setAttribute('disabled','disabled')
        const width= Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        const wDistance = width- el.getBoundingClientRect().right;
        const hDistance = el.getBoundingClientRect().top;
        setTranslateWidth(wDistance-40)
        console.log('wDistance--> ', wDistance);
        
        questionContext.questionDispatch({action:'changeTransBtn',data:{id,ansId}})
        const ansIdx = questionContext.questionState[id-1].ans.findIndex(ans=>ans.ansId === ansId)
        console.log('height: ',questionContext.questionState[id-1].question.trans);
        
        setTranslateHeight(hDistance)
        setIsContainerActive(false)
        closeCmp()

        
        // .setAttribute('disabled','disabled')
    }
    const handleHeight = (id)=>{
        if (translateHeight+questionContext.questionState[id-1].question.trans > 0) {
            console.log('handleHeight----> ',(translateHeight+questionContext.questionState[id-1].question.trans) *-1);
            
            return (translateHeight+questionContext.questionState[id-1].question.trans) *-1
        } else {
            console.log('else handleHeight----> ', questionContext.questionState[id-1].question.trans);
            
            return questionContext.questionState[id-1].question.trans
        }
    }
    const answerButtonArr = rowButton
    .map(((ans,idx)=> (<button key={ans.ans} 
                        className={`${classes["button-style"]} 
                        ${classes[ans.visible ? '' : 'hide']} 
                        ${classes[visible[idx] ? '' : 'hide']}
                        
                        `} 
                        onClick={()=>handleClick(ans.goTo,idx,ans.ansId,ans.queId)} 
                        ref={el => buttonRef.current[idx] = el}
                        style = { 
                            {transform: `translate(${translateWidth}px, ${questionContext.questionState[ans.queId-1].question.trans *2 }px)`,
                         }
                        }
                        >
                            {ans.ans}
                        </button>)))
    return (
        <div  className={`${classes["row-container"]} ${isContainerActive? '' : classes['inactive']}`}>
            {answerButtonArr}
        </div>
    )
}

export default RowButton