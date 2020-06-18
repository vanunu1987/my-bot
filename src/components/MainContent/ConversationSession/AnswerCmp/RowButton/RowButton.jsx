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
        el.setAttribute('disabled','disabled')
        const wDistance = el.getBoundingClientRect().right;
        const hDistance = el.getBoundingClientRect().top;
        setTranslateWidth(wDistance-110)
        questionContext.questionDispatch({action:'changeTransBtn',data:{id,ansId}})
        const ansIdx = questionContext.questionState[id-1].ans.findIndex(ans=>ans.ansId === ansId)
        console.log('height: ',questionContext.questionState[id-1].ans[ansIdx].transHeight);
        
        setTranslateHeight(hDistance)
        setIsContainerActive(false)
        setTimeout(()=>{
            closeCmp()

        },500)
        
        // .setAttribute('disabled','disabled')
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
                            {transform: `translate(${translateWidth}px, ${120-translateHeight}px)`,
                             display: 'block' ,
                             position: 'absolute',
                             width: '100px'  
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