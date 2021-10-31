import React, { useState, useEffect } from "react";
import { SideMenu } from "./navbar";
import Dropdown from "./DropdownSide";
const MasterPageLayout = (props) => {
//   useEffect(() => {
//     window.addEventListener("beforeunload", alertUser);
//     return () => window.removeEventListener("beforeunload", alertUser);
//   });

//   const alertUser = (event) => {
//     event.preventDefault();
//     event.returnValue = "";
//   };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ width: "10%", backgroundColor: "white", minWidth: "170px" }}
      >
        <SideMenu />
      </div>
      <div className="Container-Right">
        <Dropdown name={props.name} email={props.email} />
        {props.children}
      </div>
    </div>
  );
};

export default MasterPageLayout;
