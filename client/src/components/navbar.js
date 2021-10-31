import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUserFriends,
  faSignOutAlt,
  faMapMarked,
  faPlay,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { DescrytionObj } from "../utils/encryption";
import Loading from "./Loading";
import { filterACL } from "../utils/filterACL";

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
    text: "Booking",
    href: "/booking",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faBookOpen} />,
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
    href: "/login",
    icon: <FontAwesomeIcon className="icon-SideMenu" icon={faSignOutAlt} />,
  },
];

const SideMenu = () => {
  const history = useHistory();
  let location = useLocation();
  const [loading, setLoading] = useState(false);
  const removeItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    let user = DescrytionObj("user");

    await axios
      .post(`/api/logout/${user.UserId}`)
      .then((res) => {
        setLoading(false);
        localStorage.clear();
        history.push("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log("🚀 ~ file: navbar.js ~ line 63 ~ axios.post ~ err", err);
      });
  };
  const [temp, setTemp] = useState(location.pathname);
  useEffect(() => {
    setTemp(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <nav
        className="navbar navbar-inverse fixed-top"
        id="sidebar-wrapper"
        role="navigation"
      >
        <ul className="nav sidebar-nav">
          <div className="sidebar-header ">
            <a className="navbar-brand" href="/home">
              {
                <img
                  src="/NovelX.png"
                  width="30rem"
                  height="30rem"
                  alt="logo"
                />
              }
            </a>
          </div>
          {filterACL(SideMenuItem).map((w, i) => {
            return (
              <a
                key={w.text + i}
                className={`nav-link ${temp === w.href ? "active" : null}`}
                aria-current="page"
                href={w.href}
              >
                {w.icon}
                {w.text}
              </a>
            );
          })}
          <div className="divider"></div>
          {SideMenuBottomItem.map((w, i) => {
            return (
              <a
                key={w.text + i}
                className={`nav-link ${temp === w.href ? "active" : null} ${
                  i === SideMenuBottomItem.length - 1 && "logout-btn"
                }`}
                aria-current="page"
                href={w.href}
                onClick={async (e) =>
                  i === SideMenuBottomItem.length - 1 && (await removeItem(e))
                }
              >
                {w.icon}
                {w.text}
              </a>
            );
          })}
        </ul>
      </nav>
      {loading && <Loading />}
    </>
  );
};
export { SideMenu };
