import React, { useState ,useEffect } from "react";
import "./cart.css";
import Loading from "../loading/loading"
import { Link } from "react-router-dom";
import * as Hi from "react-icons/hi"
import app_data from "../app_data/app_data"
import Postreq from "../request/post_request"


function CartComponent() {
    const [order, setorder] = useState({
      item:0,
      orderitems:[]
    })
    const [pagestatus, setpagestatus] = useState(false)


    useEffect(() => {
      Postreq("/api/orderapi/",{},setorder,setpagestatus)
    }, [])
    async function update_cart(id,action) {
      var url =  '/api/update/product/'+ String(action) +'/'+ String(id) + '/';
      Postreq(url,{})
      Postreq("/api/orderapi/",{},setorder,setpagestatus)
    }



    
  return (
    <>  
      <div className={pagestatus===0?"hidden":""}>
                <Loading/>
      </div>
      <div className={pagestatus===0?"cart-container transition-effect":"cart-container transition-effect obj-hidden"}>
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
                            src={app_data.url.replace("store","static")+ item.image}
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
                            
                        <img
                            alt="increase quantity"
                            class="chg-quantity update-cart"
                            onClick={()=>update_cart(item.product,"add")}
                            src={app_data.url.replace("store","static"+"/media/arrow-up.png")}
                        />
  
                        <img
                            alt="decrease quantity"
                            class="chg-quantity update-cart"
                            onClick={()=>update_cart(item.product,"remove")}
                            src={app_data.url.replace("store","static"+"/media/arrow-down.png")}
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

