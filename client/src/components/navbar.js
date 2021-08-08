import React, { useState } from "react";
import Dropdown from "./dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faUser,faUserFriends,faSignOutAlt,faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { useLocation,useHistory } from "react-router-dom";
const Navbar = () => {
  const [dropDown, SetDropDown] = useState(false);
  console.log("dropDown: ", dropDown);



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          {<img src="/NovelX.png" width="30rem" height="30rem" />}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbar"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/home">
              Home
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              Pricing
            </a>
            <a
              className="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </div>
          {/* onBlur={()=>SetDropDown(false)}   tabIndex="0"  */}
          <div className="d-flex">
            <img
              src="/avatar.png"
              onClick={() => SetDropDown(!dropDown)}
              width={40}
              height={40}
              className="avatarLogo"
            />

            {dropDown && (
              <Dropdown
                close={dropDown}
                onBlur={() => SetDropDown(false)}
                tabIndex="0"
              />
            )}
            {/* <button className="btn btn-outline-success" type="submit">Logout</button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

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
    localStorage.removeItem('user')
    history.push('/login')
}
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
        {SideMenuItem.map((w) => {
          return (
            <a
              className={`nav-link ${
                location.pathname === w.href ? "active" : null
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
              className={`nav-link ${
                location.pathname === w.href ? "active" : null
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
export { Navbar as default, SideMenu };
