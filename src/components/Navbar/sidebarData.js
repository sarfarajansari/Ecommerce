import React from 'react'
import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";
import * as Io from "react-icons/io";


export const sidebarData =[
    {
        title:'Home',
        path:"/",
        icon:<Ai.AiFillHome/>,
        cName:'nav-text'
    },
    
    {
        title:'Cart',
        path:"/cart",
        icon:<Fa.FaCartPlus/>,
        cName:'nav-text'
    },
    {
        title:'History',
        path:"/orders/history",
        icon:<Io.IoIosPaper/>,
        cName:'nav-text'
    },
    
    // {
    //     title:'Message',
    //     path:"/about/#message",
    //     icon:<Fa.FaEnvelopeOpenText/>,
    //     cName:'nav-text'
    // },
    {
        title:'About',
        path:"/about",
        icon:<Io.IoMdPeople/>,
        cName:'nav-text'
    },
    // {
    //     title:'Support',
    //     path:"/support",
    //     icon:<Io.IoMdHelpCircle/>,
    //     cName:'nav-text'
    // },
]