import React from "react";
import Navbar from "../components/Navbar/Navbar";
import  Footer from "../components/header/footer";
import CheckoutComponent from "../components/checkout/checkout";
import CartComponent from "../components/cart/cart";
import History from "../components/history/history"
import Login from "../components/Login/login"
import Register from "../components/Login/register"
import About from "../components/about/about"

import { Switch ,Route} from "react-router-dom";




function Page() {
  return (
      <div id="container">
        <div>
          <Navbar />
        </div>
        <div id="empty"></div>
        <div className="page-content">
        <Switch>
          <Route path="/cart/" exact component={CartComponent} />
          <Route path="/checkout/" exact component={CheckoutComponent} />
          <Route path="/orders/history" exact component={History} />
          <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/about" exact component={About}/>
        </Switch>
        </div>
        <Footer/>
      </div>
  );
}

export default Page;
