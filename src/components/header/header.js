import React from 'react'
import "./header.css"

function Header() {
    return (
        <div>
            <div className="grid">
                <div className="element">
                    <div color={"white"} className="text-white app-header text-center">
                        <h1 id="apptag" > Always in style!</h1>
                        <hr style={{color:"white"}}/>
                        <h1 id="app-detail"> Get Everything you need at one place!</h1>
                    </div>
                </div>
            </div>
            <div className="header-bottom"></div>
        </div>
    )
}



export default Header
