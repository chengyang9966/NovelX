import React, { useState } from "react";

const Dropdown=(props)=>{
    const [dropDown, SetDropDown] = useState(false); 
    const   handleBlur = (e) => {
      console.log('gew')
        // firefox onBlur issue workaround
          SetDropDown(false);
    
      }
    return(
        <div className="d-flex justify-content-between mt-5 me-4">
            <div></div>
            <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex flex-column ">
                <h4>{props.name}</h4>
                <h4 className="descTextColor">{props.email}</h4>
                
                </div>
             <img
              src="/avatar.png"
              onClick={() => SetDropDown(!dropDown)}
              width={40}
              height={40}
              className="avatarLogo mx-4"
              alt='Avatar'
              
            />
            </div>
       
       {dropDown&&
  <div  onBlur={()=>console.log('egegg')}  id='profileDropDown' tabIndex={0} className="dropdown-menu" >
  <a className="dropdown-item" href="/Profile">Profile</a>
    <div className="dropdown-divider"></div>
  </div>}
</div>

    )
}
export default Dropdown