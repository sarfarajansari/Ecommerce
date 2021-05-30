import React from "react"

class Header extends React.Component{
    render(){
      return(
          <div className="header text-white">
              <div className="row justify-content-center">
                  <div className="col-10">
                      <h1 className="display-1">Elements</h1>
                      <hr></hr>
                      <p1 id="head-discription">Some react componets made by sarfaraj</p1>
                  </div>
              </div>
          </div>
      )
    }
}

export default Header