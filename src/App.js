import React, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './pages/Layouts'

const initialState = 
  [
    { id : 1 ,question: {id:1,trans:0,val:'היי, אני בוטי ואני כאן כדי לעזור לך!'} , ans:[{goTo:2,ans:'1' ,visible:false, ansId:1, transHeight: 0, queId:1 },{goTo:2,ans:'2',visible:false , ansId:2, transHeight: 0 , queId:1}]},
    { id : 2 ,question: {id:2,trans:0,val:'האם תרצה שאבדוק לך אם אתה זכאי להוזלה בביטוח החיים?'} , ans:[{goTo:3,ans:'כן',visible:true , ansId:1, transHeight: 0, queId:2 },{goTo:4,ans:'לא',visible:true , ansId:2, transHeight: 0, queId:2 }]},
    { id : 3 ,question: {id:3,trans:0,val:'האם קיים לך ביטוח חיים?' }, ans:[ { goTo: 5, ans:'כן' ,visible:true , ansId:1, transHeight: 0 , queId:3}, { goTo: 5, ans: 'לא' ,visible:true , ansId:2, transHeight: 0, queId:3 },{ goTo: 5, ans: 'היה לי פעם' ,visible:true , ansId:3, transHeight: 0 , queId:3}, { goTo: 5, ans: 'לא יודע מזה',visible:true , ansId:4, transHeight: 0 , queId:3}]},
    { id : 4 ,question: {id:4,trans:0,val:'תודה רבה, ולהתראות'} , ans:[{goTo:2,ans:'1' , visible:false , ansId:1, transHeight: 0, queId:4 },{goTo:2,ans:'2' ,visible:false , ansId:2, transHeight: 0 , queId:4}]},
    { id : 5 ,question: {id:5,trans:0,val:'אוקיי, אני רואה שמגיע לך הנחה, תרצה לשמוע פרטים נוספים?'} , ans:[ { goTo: 3, ans:'כן' ,visible:true , ansId:1, transHeight: 0 , queId:5}, { goTo: 3, ans: 'לא' ,visible:true , ansId:2, transHeight: 0 , queId:5}]},
]

const reducer = (state,{action,data})=>{
  const newArr = [...state]
  switch (action) {
    case 'shift':
    const newState = state.slice(1)
      return newState
    case 'changeTrans':
    data.id.forEach(id => {
      const row = state.find(queObj=> queObj.id === id)  
      const idx = state.findIndex(queObj => queObj.id === id)
      row.question.trans -=120
      newArr.splice(idx,1,row)
    });
      return newArr
    case 'changeTransBtn':
    let row = state.find(queObj=> queObj.id === data.id)  
    console.log(row);
    
    const idx = state.findIndex(queObj=> queObj.id === data.id)  
    let newAns = row.ans.find(ans=> ans.ansId === data.ansId)
    const ansIdx = row.ans.findIndex(ans=> ans.ansId === data.ansId)
    newAns.transHeight += 120
    console.log('newAns',newAns);
    
    row.ans.splice(ansIdx,1,newAns)
    row = {...row,ans:newAns}
    newArr.splice(idx,1,row)
    return newArr
  }
}

export const QuestionContext = React.createContext()

function App() {

  const [question, dispatch] = useReducer(reducer, initialState)
  return (
    <QuestionContext.Provider value={{questionState: question, questionDispatch: dispatch}}>
      <div className="App">
        <Layout/>
      </div>
    </QuestionContext.Provider>
  );
}

export default App;
