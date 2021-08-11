import React, { useState } from "react";
import Navbar,{SideMenu} from './navbar';
import Dropdown from './DropdownSide'
import { useHistory } from "react-router";
const MasterPageLayout=(props)=>{
    const history=useHistory()
    const [dropDown, SetDropDown] = useState(false); 
      const removeItem=()=>{
        localStorage.removeItem('user')
        history.push('/login')
    }
    return(
        <div style={{display:'flex'}}>
            <div style={{width:'10%',backgroundColor:'white',minWidth:'170px'}}>
           <SideMenu/>
            </div>
            <div className="Container-Right">
            <Dropdown name={props.name} email={props.email}/>
           {props.children}
            </div>
        </div>
    )
}

export default  MasterPageLayout