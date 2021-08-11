import React, { useState } from "react";

const Dropdown=(props)=>{
    const [dropDown, SetDropDown] = useState(false); 
    const   handleBlur = (e) => {
        // firefox onBlur issue workaround
        if (e.nativeEvent.explicitOriginalTarget &&
            e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
          return;
        }
    
        if (this.state.show) {
          setTimeout(() => {
            SetDropDown(false);
          }, 200);
        }
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
              
            />
            </div>
       
       {dropDown&&
  <div  onBlur={(e)=>handleBlur(e)} tabIndex='1' className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <a className="dropdown-item" href="/Profile">Profile</a>
    <div className="dropdown-divider"></div>
  </div>}
</div>

    )
}
export default Dropdown