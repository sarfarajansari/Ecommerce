import React, { useState ,useEffect} from "react";
import "./history.css";
import Loading from "../loading/loading"
import { Link } from "react-router-dom";
import Postreq from "../request/post_request"

function History() {
    const [page, setpage] = useState(-1)
    const [Carts, setCarts] = useState([])
    useEffect(() => {
        Postreq("/api/order/history/",{},setCarts,setpage)
    }, [])
    return (
        <>
            <div className={page===0?"hidden":""}>
                <Loading/>
            </div>
            <div className={page===0?"transition-effect":"transition-effect obj-hidden"}>
                <div className="salmon">
                    <h1 className="text-center">Order History</h1>
                </div>
                <div className="history-grid">
                    {Carts.map((order)=>{
                        return(
                            <Link style={{color:"black"}} to={"/order/" + String(order.id)}>
                                <div className="order-grid box-element">
                                    <div><p1 className="text-center"><strong className="text-center">Order No :{" "}</strong>{order.id}</p1> </div>
                                    <div><p1 className="text-center"><strong>Order Date :{" "}</strong>{order.date} </p1></div>
                                    <div><p1><strong>Total items :{" "}</strong></p1>{order.item} </div>
                                    <div><p1><strong>Total Price :{" "}</strong></p1> {order.total}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default History
