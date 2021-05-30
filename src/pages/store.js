import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Products from "../components/products/products";
import Header from "../components/header/header";
import  Footer from "../components/header/footer"


function store() {
  return (
        <div id="container">
          <div>
            <Navbar animate="yes" />
          </div>
          <div id="empty"></div>
          <div>
            <Header/>
          </div>
          <div className="page-content" style={{marginTop:"0px"}}>
            <Products />
          </div>
          <div>
            <Footer/>
          </div>
        </div>

  );
}

export default store;
