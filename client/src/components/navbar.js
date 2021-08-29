import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faUser,faUserFriends,faSignOutAlt,faMapMarked,faPlay } from "@fortawesome/free-solid-svg-icons";
import { useLocation,useHistory } from "react-router-dom";

const SideMenuItem = [
  {
    text: "Home",
    href: "/",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faHome} />,
  },
  {
    text: "Personal",
    href: "/personal",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faUser} />,
  },
  {
    text: "Public",
    href: "/public",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faUserFriends} />,
  },
  {
    text: "Daily Tasks",
    href: "/playground",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faPlay} />,
  },
  {
    text: "Map",
    href: "/Map",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faMapMarked} />,
  },
];
const SideMenuBottomItem = [
  // {
  //   text: "Home",
  //   href: "/",
  //   icon: <FontAwesomeIcon className="icon-SideMenu" icon={faHome} />,
  // },
  // {
  //   text: "Personal",
  //   href: "/personal",
  //   icon: <FontAwesomeIcon className="icon-SideMenu" icon={faUser} />,
  // },
  {
    text: "Log Out",
    href: "/public",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faSignOutAlt} />,
  },
];


const SideMenu = () => {
  const history=useHistory()
  let location = useLocation();
  const removeItem=()=>{
    localStorage.clear()
    history.push('/login')
}
const [temp,setTemp] =useState(location.pathname)
useEffect(() => {
  setTemp(location.pathname)
}, [location.pathname])
  console.log("location: ", location.pathname);
  return (
    <nav
      className="navbar navbar-inverse fixed-top"
      id="sidebar-wrapper"
      role="navigation"
    >
      <ul className="nav sidebar-nav">
        <div className="sidebar-header ">
          <a className="navbar-brand" href="/home">
            {<img src="/NovelX.png" width="30rem" height="30rem" />}
          </a>
        </div>
        {SideMenuItem.map((w,i) => {
          return (
            <a
            key={w.text+i}
              className={`nav-link ${
                temp=== w.href ? "active" : null
              }`}
              aria-current="page"
              href={w.href}
            >
              {w.icon}
              {w.text}
            </a>
          );
        })}
      <div className="divider"></div>
      {SideMenuBottomItem.map((w,i) => {
          return (
            <a
            key={w.text+i}
              className={`nav-link ${
                temp === w.href ? "active" : null
              } ${i===SideMenuBottomItem.length-1&&'logout-btn'}` }
              aria-current="page"
              href={w.href}
              onClick={()=>i===SideMenuBottomItem.length-1&&removeItem()}
            >
              {w.icon}
              {w.text}
            </a>
          );
        })}
      </ul>
    </nav>
  );
};
export {SideMenu };
