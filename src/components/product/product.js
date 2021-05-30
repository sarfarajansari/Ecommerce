import React ,{useState,useEffect} from 'react'
import Loading from "../loading/loading"
import "./product.css"
import { Link } from "react-router-dom";
import * as Hi from "react-icons/hi"
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from "react-icons/fa"
import Alert from "../min/alert"

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
function ProductComponent(props) {
    const Id = props.id
    const [Product, setProduct] = useState({
        details:[],
        images:[],
        quantity:0,
    })
    const [message, setmessage] = useState("")

    const [Current, setCurrent] = useState(0)
    const [Loaded, setLoaded] = useState(false)
    const [notfound, setnotfound] = useState(false)


    const get_product = ()=>{
        fetch("/api/product/" + String(Id)+"/")
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            if(data["status"]===0){
                setProduct(data)
                setLoaded(true)
            }
            else{
                setnotfound(true)
            }
            
        })

    }
    useEffect(() => {
        get_product()
        window.onscroll=()=>{
            setmessage("")
        }
    }, [])
    const next_image= ()=>{
        if(Current<Product.images.length-1){
            setCurrent(Current+1)
        }
        else{
            setCurrent(0)
        }
    }
    const previous_image= ()=>{
        if(Current>0){
            setCurrent(Current-1)
        }
        else{
            setCurrent(Product.images.length-1)
        }
    }
    const get_property=(property)=>{
        if(Product[property.toLowerCase()]){
            return(
                <>
                <div> <strong>{property}</strong></div>
                <div>{Product[property.toLowerCase()]}</div>
                </>
            )
        }
    }
    async function update_cart(id,action) {
        var url ='/api/update/product/'+ String(action) +'/'+ String(id) + '/?format=json';
        const csrftoken = getCookie('csrftoken');
        const requestdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken },
            body:JSON.stringify({})
        }
        var response = await fetch(url,requestdata)
        var data = await  response.json()
        get_product()
        setmessage(data.message)
    }
    if(notfound){
        return(
            <div className="notfound">
                <h1>NOT FOUND!!</h1>
            </div>
        )
    }


    return (
        <>
            <div className={Loaded?"hidden":""}>
                <Loading/>
            </div>
            <div className="store-alert"><Alert message={message}/></div>
            <div className={Loaded?"product-grid transition-effect":"product-grid transition-effect obj-hidden"}>
            <div className="head-title box-element">
            <Link to="/">
                <button className="btn btn-outline-dark"><Hi.HiOutlineArrowNarrowLeft/> Continue Shopping</button>
            </Link>
            <h1 className="text-center text-white">{Product.name}</h1>
            </div>
            <div className="product-detail">
                <div className="detail-grid">
                    <div className="corosoul box-element">

                        <section className="slider">
                            <FaArrowAltCircleLeft className="left-arrow" onClick={previous_image}></FaArrowAltCircleLeft>
                            <FaArrowAltCircleRight className="right-arrow" onClick={next_image}></FaArrowAltCircleRight>
                            {Product.images.map((img,index)=>{
                                return <img className={index===Current?"image active":"image"} src={img.img} alt="yellow"></img>
                            })}
                            
                        </section>
                    </div>
                    <div className="details box-element">
                        {/* <Alert message={message}/> */}
                        <div className="price-grid">
                            {get_property("Price")}
                            {get_property("Weight")}
                            {get_property("Dimensions")}
                            {get_property("Type")}
                        </div>
                        <div>
                            <br/>
                            <h2>Details:</h2>
                            <ul>
                                {Product.details.map((detail)=>{
                                    return <li>{detail.detail}</li>
                                })}
                            </ul>
                            <div className="some-btns">
                                <button type="button" onClick={()=>update_cart(Product.id,"add")} className="btn btn-outline-danger">{Product.quantity===0?"Add to cart":"Add more"}</button>
                                <button type="button" onClick={()=>update_cart(Product.id,"remove")} className={Product.quantity>0?"btn btn-outline-danger":"hidden"}>Remove from cart</button>
                                <Link to="/checkout">
                                <button type="button" className={Product.quantity>0?"btn btn-outline-success":"hidden"}>Checkout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductComponent
