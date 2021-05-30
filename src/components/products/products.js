import React,{useState,useEffect} from 'react'
import "./products.css"
import Loading from "../loading/loading"
import Cartloading from "../loading/Cartloading"
import { Link } from "react-router-dom"
import Alert from "../min/alert"
import app_data from "../app_data/app_data"
import GetRequest from "../request/get_request"
import Postreq from "../request/post_request"

function Products() {

    const [products, setproducts] = useState([])
    const [status, setstatus] = useState(-1)
    const [message, setmessage] = useState({message:""})

    useEffect(() => {
        window.onscroll=()=>{
            setmessage({message:""})
        }
    }, [])

    if(status===-1){
        GetRequest("/api/products",setproducts,setstatus)
    }


    return (
        <>
        <div className={status===1?"":"hidden"}>
                <Cartloading/>
        </div>
        
        <div className={status===-1?"":"hidden"}>
                <Loading/>
        </div>
        <div>
            <div className="store-alert"><Alert message={message.message}/></div>
            <div class="" className={status!==-1?"store-grid transition-effect":"store-grid transition-effect obj-hidden"}>
                {products.map((product,index) => {
                    return(
                        <div key={index}  class="elem" >
                            <img className="thumbnail" src={app_data.url.replace("/store","")+"/static"+ product.image} alt="placeholder"/>

                            <div class="box-element product">
                                <h6><strong>{product.name}</strong></h6>
                                <hr/>
                                <button class="btn btn-outline-secondary add-btn update-cart" style={{marginRight:"1.5em"}} onClick={()=>{
                                    setstatus(1)
                                    Postreq('/api/update/product/add/'+ String(product.id) + '/',{},setmessage,setstatus)
                                }} data-page="store">Add to Cart</button>
                                <Link to={"/product/"+String(product.id)} class="btn btn-outline-success">View</Link>
                                <h4 class="product-price">{product.price}</h4>
                            </div>
                        </div>
                    )

                })}
                    
            </div>
        </div>
        </>
    )
}

export default Products
