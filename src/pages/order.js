import React from "react";
import Navbar from "../components/Navbar/Navbar";
import  Footer from "../components/header/footer";
import Ordersum from "../components/orderSum/ordersum"


function store(props) {
  return (
        <div id="container">
          <div>
            <Navbar />
          </div>
          <div id="empty"></div>
          <div className="page-content">
              <Ordersum id={props.match.params.id}/>
          </div>
          <div>
            <Footer/>
          </div>
        </div>
  );
}

export default store;
