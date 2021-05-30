import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom"
import Loading from "../loading/loading"
import "./order.css"


export default function Ordersum(props) {
    const id = props.id
    const [loaded, setloaded] = useState(false)
    const [notfound, setnotfound] = useState(false)
    const [order, setorder] = useState({
      orderitems:[],
      shipping:{
        state:"",
        city:"",
        country:"",
        zipcode:"",
        address:""
      }
    })
    console.log(id)

    async function get_order() {
        var url = "/api/completed/order/"+ String(id) +"?format=json";
        var response = await fetch(url)
        const data = await response.json()
        if(data["status"]===0){
          setorder(data)
          console.log(data)
          setloaded(true)
        }
        else{
          setnotfound(true)
        }
        
       }

    useEffect(() => {
      get_order()
    }, [])

    if(notfound){
      return(
          <div className="notfound">
              <h1>NOT FOUND!!</h1>
          </div>
      )
    }

  return (
    <>
    <div className={loaded?"hidden":""}>
        <Loading/>
    </div>
    <div className={loaded?"transition-effect":"transition-effect obj-hidden"}>
      <h3 className="text-center" style={{ color: "rgb(114, 37, 23)" }}>
            ORDER NO : {id}
          </h3>
      <div className="single-order-grid">
      <div className="order-summary box-element">
        <h3 className="text-center" style={{ color: "rgb(114, 37, 23)" }}>
          Order Summary
        </h3>
        <h5 style={{paddingLeft:"0.5rem"}}>
          date: {order.date}
        </h5>
        <div className="summary-grid">
          {order.orderitems.map((item, index) => {
            return (
              <>
                <div className="item-OI">
                  <hr></hr>
                  <Link to={"/product/"+String(item.product)}>
                    <img className="row-image" src={item.image} alt="" />
                  </Link>
                </div>
                <div className="item-OI">
                  <hr></hr>
                  <Link
                    class="link black"
                    to={"/product/"+String(item.product)}
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="item-OI">
                  <hr></hr>$<p1 id="p{{item.product.id}}">{item.price}</p1>
                </div>

                <div className="item-OI">
                  <hr></hr>

                  <p1 class="total_single_item" id="t{{item.product.id}}">
                    x{item.quantity}
                  </p1>
                </div>
              </>
            );
          })}
        </div>
        <div className="checkout-totals">
          <h5>
            Items{" : "}
            <strong className="total-items">
              {" "}
              {order.item}
            </strong>
          </h5>
          <h5>
            Total:
            <strong>
              {" "}
              $<p1 id="final_amount">{order.total}</p1>
            </strong>
          </h5>
        </div>
      </div>
      <div className="shipping-info box-element">
        <h3 className="text-center" style={{ color: "rgb(114, 37, 23)" }}>
          Shipping info
        </h3>
        <p>Address : {order.shipping.address}</p>
        <p>City : {order.shipping.city}</p>
        <p>State : {order.shipping.state}</p>
        <p>Country : {order.shipping.country}</p>
        <p>Zipcode : {order.shipping.zipcode}</p>
      </div>
    </div>
    </div>
  </>
  );
}
