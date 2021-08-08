import { useHistory } from "react-router";
import { useState } from "react";

const Dropdown=({close,onBlur,tabIndex})=>{
    const history=useHistory()
    const [view,setView]=useState(false)
   const removeItem=()=>{
        localStorage.removeItem('user')
        history.push('/login')
    }
    return(
       <div onBlur={()=>setView(true)} tabIndex={tabIndex} className="dropdown-menu">
        <a className="dropdown-item" href="/Profile">Profile</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" onClick={()=>removeItem()}>Log Out</a>
      </div>
    )
}

export default Dropdown