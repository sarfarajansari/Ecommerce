import React, { useState ,useEffect } from "react";
import "./cart.css";
import Loading from "../loading/loading"
import { Link } from "react-router-dom";
import * as Hi from "react-icons/hi"
import app_data from "../app_data/app_data"
// import Items from "./items.js"

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function CartComponent() {
    const [order, setorder] = useState({
      item:0,
      orderitems:[]
    })
    const [loaded, setloaded] = useState(false)

    async function get_order() {
      var url ="/api/orderapi"
      var response = await fetch(url)
      const data = await response.json()
      console.log(url)
      setorder(data)
      setloaded(true)
      console.log(order)
     }
    useEffect(() => {
      get_order()
    }, [])
    async function update_cart(id,action) {
      var url =  '/api/update/product/'+ String(action) +'/'+ String(id) + '/?format=json';
      const csrftoken = getCookie('csrftoken');
      const requestdata = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken},
          body:JSON.stringify({})
      }
      var response = await fetch(url,requestdata)
      var data = await  response.json()
      console.log(data)
      get_order()
    }



    
  return (
    <>  
      <div className={loaded?"hidden":""}>
                <Loading/>
      </div>
      <div className={loaded?"cart-container transition-effect":"cart-container transition-effect obj-hidden"}>
        <div className="display-totals">
          <div className=" box-element">
          <Link to="/">
            <button className="btn btn-outline-dark"><Hi.HiOutlineArrowNarrowLeft/> Continue Shopping</button>
          </Link>
          <br></br>

            <table className="table ">
              <tbody>
                <tr>
                  <th>
                    <h5>
                      Items <strong className="total-items">{" : "} {order.item}</strong>
                    </h5>
                  </th>
                  <th>
                    <h5>
                      Total:
                      <strong>
                        {" "}
                        $<p1 id="final_amount">{order.total}</p1>
                      </strong>
                    </h5>
                  </th>
                  <th className={order.item>0?"":"checkout-hidded"}>
                    <Link to="/checkout">
                      <button
                        className="btn btn-outline-success w-75  checkoutbtn"
                      >
                        Checkout
                      </button>
                    </Link>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="display-products">
          <div className="orderitems box-element">
            {/* headings */}
            <div></div>
            <div>
              <strong>Item</strong>
            </div>
            <div>
              <strong>Price</strong>
            </div>
            <div>
              <strong>Quantity</strong>
            </div>
            <div>
              <strong>Total</strong>
            </div>
            

            {/* orderitems */}
              {order.orderitems.map((item,index)=>{
                  return(
                      <>
                      
                    <div className="item-OI" >
                        <hr></hr>
                        <Link to={"/product/"+String(item.product)}>
                        <img
                            className="row-image"
                            src={item.image}
                            alt=""
                          />
                        </Link>
                    </div>
                    <div className="item-OI" >
                        <hr></hr>
                        <Link to={"/product/"+String(item.product)}>
                        {item.name}
                        </Link>
                    </div>
                    <div  className="item-OI">
                        <hr></hr>
                        $<p1 id={"p"+String(item.product)}>{item.price}</p1>
                    </div>
                    <div className="item-OI" >
                        <hr></hr>
                        <p class="quantity" id={"q"+String(item.product)}>
                        {item.quantity}
                        </p>
                        <div class="quantity">
                            <hr></hr>
                        <img
                            alt="increase quantity"
                            class="chg-quantity update-cart"
                            onClick={()=>update_cart(item.product,"add")}
                            src="/static/images/arrow-up.png"
                        />
  
                        <img
                            alt="decrease quantity"
                            class="chg-quantity update-cart"
                            onClick={()=>update_cart(item.product,"remove")}
                            src="/static/images/arrow-down.png"
                        />
                        </div>
                    </div>
                    <div className="item-OI" >
                        <hr></hr>
                        $
                        <p1 class="total_single_item" id={"t"+String(item.product)}>
                        {item.total}{" "}
                        </p1>
                    </div>
  
                </>
  
                  )
              })}
  






          </div>
        </div>
      </div>
    </>
  );
}

export default CartComponent;

