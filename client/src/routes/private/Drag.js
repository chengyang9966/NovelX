import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import HeaderText from "../../components/HeaderText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { ColorPlatter } from "../../components/ColorPlatter";
import closeBtn from "../../components/closeBtn";
import { SketchPicker } from 'react-color';
import Toast from "../../components/toast";
import { TYPE } from "../../Types/Type";
const Drag = (props) => {
  const [loading, setLoading] = useState(false);
  const [taost, setToast] = useState(false);

  const [tasks,SetTasks] = useState([
      { id:1,name: "Learn Angular", category: "wip", bgcolor: "yellow" },
      { id:2,name: "React", category: "wip", bgcolor: "pink" },
      { id:3,name: "Vue", category: "complete", bgcolor: "skyblue" },
    ],
);
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
}
const OpenColor=(text,id)=>{
 return(
   <div style={{position:'absolute',backgroundColor:'blue'}}>
<SketchPicker/>
   </div>
 )  
}
const onDragOver = (ev) => {
    ev.preventDefault();
    console.log('hiii')
    setToast(true);
}
const AddTask=(e,name)=>{

    SetTasks(prev =>[...prev,{
      id:tasks.length+1,
      name:'',
      category:name,
      bgcolor:'white'
    }])
    
}

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    console.log('id: ', ev.dataTransfer.getData("id"));
    if (ev.target.id) {
        swap(id, ev.target.id)
        ev.dataTransfer.clearData()
      }
    let TestTask = tasks.filter((task) => {
      if (task.id == id) {
        console.log('task: ', task);

        task.category = cat;
      }
      return task;
    });
    console.log('TestTask: ', TestTask);
    SetTasks(TestTask);
  };
  const ChangeText=(text,id)=>{
    let pos = tasks.findIndex((object) => {return (object.id === id)})
    let NewArray= tasks
    NewArray[pos].name=text

    SetTasks(NewArray)

  }
  const deleteItem=(id)=>{
  console.log("🚀 ~ file: Drag.js ~ line 66 ~ deleteItem ~ id", id,tasks)
    let result=  tasks.filter(w=>w.id!==id)
    SetTasks(result)

  }
  const swap = (title1, title2) => {
    let pos2 = tasks.findIndex((object) => {return (object.id === title2)})
    let pos1 = tasks.findIndex((object) => {return (object.id === title1)})
    let samplearray = tasks
    let temp = tasks[pos1]
    samplearray[pos1] = tasks[pos2]
    samplearray[pos2] = temp
    SetTasks( samplearray)
  }
  let NewTasks = {
    wip: [],
    complete: []
}

tasks.forEach ((t,index) => {
    NewTasks[t.category].push(
      <div style={{display:'flex',justifyContent:'center',position:'relative'}}>
        <div      
        key={t.id} 
            onDragStart = {(e) => onDragStart(e, t.id)}
            draggable
            id={t.id}
            className="draggable"
            style = {{backgroundColor: t.bgcolor}}
        >

          <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
          <span contentEditable='true' onInput={e => ChangeText(e.currentTarget.textContent,t.id)}>
            {t.name}
          </span>
          <FontAwesomeIcon style={{zIndex:1000000,cursor:'pointer'}} onClick={()=>OpenColor()} icon={faPalette} title='Change Color'/>
        </div>
        </div>
        {t.category!=='complete'&&
          <div className="CloseBtnNew" onClick={()=>deleteItem(t.id)}>X</div>}

        </div>
    );
});
  return (
    <>
      <HeaderText profile={(e) => console.log(e)}>
      <Toast showToast={taost} clostToast={()=>setToast(false)}  timer="6000" type={TYPE.WARNING}/>

        {
            <>
            <div className="container-drag">
                <div className="wip"
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>{onDrop(e, "wip")}}>
                    <span className="task-header">WIP</span>
                    {NewTasks.wip}
                    <div className="addTasks" onClick={(e)=>AddTask(e,'wip')}>Add Tasks</div>
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {NewTasks.complete}
                </div>


            </div>
            </>
        }
      </HeaderText>
      {loading && <Loading />}
    </>
  );
};

export default Drag;
