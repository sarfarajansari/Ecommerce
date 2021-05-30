import React from "react";
import Navbar from "../components/Navbar/Navbar";
import  Footer from "../components/header/footer"
import  ProductComponent  from "../components/product/product"



function Product(props) {
  return (
      <div id="container">
        <div>
          <Navbar />
        </div>
        <div id="empty"></div>
        <br></br>
        <div className="page-content">
          <ProductComponent id={props.match.params.id}/>
        </div>
        <Footer/>
      </div>
  );
}

export default Product;
