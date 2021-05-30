import React,{useState,useEffect} from 'react'
import "./products.css"
import Loading from "../loading/loading"
import Cartloading from "../loading/Cartloading"
import { Link } from "react-router-dom"
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


function Products() {

    const [products, setproducts] = useState([])
    const [status, setstatus] = useState(-1)
    const [message, setmessage] = useState("")

    useEffect(() => {
        window.onscroll=()=>{
            setmessage("")
        }
    }, [])


    async function getproducts() {
        var url = '/api/products';
        var response = await fetch(url)
        var data = await  response.json()
        setproducts(data)
        setstatus(0)
   
    }
    function addproduct(id){
        var url = '/api/update/product/add/'+ String(id) + '/?format=json';
        const csrftoken = getCookie('csrftoken');
        const requestdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken },
            body:JSON.stringify({})
        }
        fetch(url,requestdata)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            setmessage(data.message)
            setstatus(0)
        })
    }

    

    if(status===-1){
        getproducts()
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
            <div className="store-alert"><Alert message={message}/></div>
            <div class="" className={status!==-1?"store-grid transition-effect":"store-grid transition-effect obj-hidden"}>
                {products.map((product,index) => {
                    return(
                        <div key={index}  class="elem" >
                            <img className="thumbnail" src={product.image} alt="placeholder"/>

                            <div class="box-element product">
                                <h6><strong>{product.name}</strong></h6>
                                <hr/>
                                <button class="btn btn-outline-secondary add-btn update-cart" style={{marginRight:"1.5em"}} onClick={()=>{
                                    setstatus(1)
                                    addproduct(product.id);
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
