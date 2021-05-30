import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";
import {RiLoginBoxFill,RiLogoutBoxFill} from "react-icons/ri";

import { sidebarData } from "./sidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function get_icon(s) {
  if (!s) {
    return <Fa.FaBars />;
  } else {
    return <Ai.AiOutlineClose />;
  }
}
function get_icon2(s) {
  if (!s) {
    return <Fa.FaBars color={"salmon"} />;
  } else {
    return <Ai.AiOutlineClose color={"salmon"} />;
  }
}

function Navbar(props) {
  const [sidebar, setsidebar] = useState(false);
  const [userData, setuserData] = useState({
    status:1
  })
  const showsidebar = () => {
    setsidebar(!sidebar);
  };
  useEffect(() => {
    fetch("/api/check/authenticated")
    .then((response)=>{
      return response.json()
    })
    .then((data)=>setuserData(data))
  }, [])

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div>
          <div className={props["animate"]?"Navbar-cust animate bg-light":"Navbar-cust bg-light"} >
            <div className="toggle">
              <Link
                to="#"
                id="toggle-btn"
                onClick={showsidebar}
                className="menu-bars toggles-nav-sm"
              >
                {get_icon2(sidebar)}
              </Link>
            </div>
            
              <div className="navbar-brand text-center">
                The Awesome Store
              </div>
          </div>
          
          <nav
            className={
              sidebar ? "nav-menu active" : "nav-menu nav-menu-inactive"
            }
          >
            <ul className="nav-menu-items">
              <li
                id="lg-toggle"
                onClick={showsidebar}
                className="menu-bars close-nav"
              >
                <Link className="toggles-nav-lg" to="#">{get_icon(sidebar)}</Link>
              </li>

              {sidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} className={sidebar?"linkk":"svg"}>
                      {item.icon}
                      <span id="title">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li  className="nav-text">
                <a style={{"color":"white"}} href="/about/#contact"  className={sidebar?"linkk":"svg"}>
                  <Fa.FaEnvelopeOpenText/>
                  <span id="title">Message</span>
                </a>
              </li>
              <li  className={userData.status===1?'nav-text':"hidden-obj"}>
                <Link style={{"color":"white"}} to="/login"  className={sidebar?"linkk":"svg"}>
                  <RiLoginBoxFill/>
                  <span id="title">Login</span>
                </Link>
              </li>
              <li  className={userData.status===0?'nav-text':"hidden-obj"}>
                <a style={{"color":"white"}} href="/logout" className={sidebar?"linkk":"svg"}>
                  <RiLogoutBoxFill/>
                  <span id="title">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
      </div>
    </IconContext.Provider>
  );
}

export default Navbar;
