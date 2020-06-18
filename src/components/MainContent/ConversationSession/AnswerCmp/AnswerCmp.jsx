import React,{useState} from 'react'
import calsses from './AnswerCmp.module.scss'

import RowBottun from './RowButton/RowButton'

const AnswerCmp = ({buttonClick,ansArr,id})=> {
    const [isContainerActive,setIsContainerActive] = useState(true)
    const mainArr = []
    let count = 0
    ansArr && ansArr.forEach((ans,idx)=>{
        if ((idx+1)%2 === 0){
            mainArr[count] = mainArr[count] || []
            mainArr[count].push(ans)
            count++
            return
        }
        mainArr[count] = mainArr[count] || []
        mainArr[count].push(ans)

    })
   const answerButtonArr = mainArr.map((arr,idx)=><RowBottun buttonClick={(goTo)=>buttonClick(goTo)} key={idx} rowButton={arr} closeCmp={()=>setIsContainerActive(false)} id={id}/>)
    return (
        <div className={`${calsses["main-content"]} ${isContainerActive? '' : calsses['inactive']}`}>
            {answerButtonArr}
        </div>
    )
}

export default AnswerCmp