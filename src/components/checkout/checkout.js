
import React from 'react'
import Loading from "../loading/loading"
import "./checkout.css"
import * as Hi from "react-icons/hi"
import { Link, Redirect } from 'react-router-dom'
import Error from "../min/error"
import app_data from "../app_data/app_data"

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

class CheckoutComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded:false,
            showPayment:false,
            shippingdata:{
                "Fname":"",
                "Lname":"",
                "email":"",
                "address":"",
                "state":"",
                "zipcode":"",
                "country":"",
                "city":""
            },
            order:{
                id:-1,
                orderitems:[]
            },
            submitted:-1
        };
        }
        componentDidMount(){
            this.get_order()
            fetch("/api/check/authenticated")
            .then((response)=>{
            return response.json()
            })
            .then((data)=>{
                if(data.status===0){
                    var current_state = this.state
                    current_state.shippingdata.name = data.user.name
                    current_state.shippingdata.email=data.user.email
                    this.setState(current_state)
                }
            })
        }
        get_order(){
            var headers = { 'Content-Type': 'application/json' }
            if (localStorage.getItem('Token') !== null){
                headers["Authorization"]="Token " + localStorage.getItem('Token')
            }
            const requestdata = {
                method: 'POST',
                headers: headers,
                body:JSON.stringify({session: JSON.parse( localStorage.getItem('session'))})
            }
            fetch(app_data.url+ '/api/orderapi/' ,requestdata)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                var current_state = this.state
                current_state.loaded= true
                current_state.order = data
                this.setState(current_state)
                console.log(data)

            })
        }

        handleinput(index,value){
            var current_state = this.state
            current_state.shippingdata[index]=value
            this.setState(current_state)
        }

    render(){
        if(this.state.submitted===0){
            return(
                <Redirect to={"/order/"+String(this.state.order.id)}/>
            )
        }
        if(this.state.loaded && this.state.order.orderitems.length<1){
            return(
                <Redirect to="/cart"/>
            )
        }
            return(
                <>  
                    <div className={this.state.loaded?"hidden":""}>
                        <Loading/>
                    </div>
                    <div className={this.state.loaded?"checkout-grid transition-effect":"checkout-grid transition-effect obj-hidden"}>
                        <div className="payment box-element">
                            <div className={this.state.showPayment?"page-shown":"page-hidden"}>
                                <button type="button" id="btn-payment" onClick={()=>{
                                        var headers = { 'Content-Type': 'application/json' }
                                        if (localStorage.getItem('Token') !== null){
                                            headers["Authorization"]="Token " + localStorage.getItem('Token')
                                        }
                                        var body= this.state.shippingdata
                                        body.session = JSON.parse( localStorage.getItem('session'))
                                        const requestdata = {
                                            method: 'POST',
                                            headers: headers,
                                            body:JSON.stringify(body)
                                        }
                                        fetch(app_data.url+ "/api/submit/order/" ,requestdata)
                                        .then((response)=>{
                                            return response.json()
                                        })
                                        .then((data)=>{
                                            console.log(data)
                                            var current_state = this.state
                                            if(data.status===1){
                                                current_state.showPayment=false
                                            }
                                            current_state.submitted= data.status
                                            this.setState(current_state)
                                            if ("session" in data){
                                                localStorage.setItem("session",JSON.stringify(data.session))
                                            }

                                        })
                                        
                                        alert("payment successful!")
                                }} className="btn btn-success w-100">Make Payment
                                </button>
                                <hr></hr>
                            </div>
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            var current_state = this.state
                            current_state.showPayment = true
                            this.setState(current_state)
                            console.log(this.state.shippingdata)
                        }} className={this.state.showPayment?"page-hidden":"page-page-shown"}>

                            <Error status={this.state.submitted} error={'Error occured while submitting order'}/>
                        <div id="user-info">
                                    <div className="form-field">
                                    <input required className="form-control" value={this.state.shippingdata.Fname} onChange={(e)=>this.handleinput("Fname",e.target.value)} type="text" id="name" placeholder="First name.." />
                                    </div>
                                    <div className="form-field">
                                    <input required className="form-control" value={this.state.shippingdata.Lname} onChange={(e)=>this.handleinput("Lname",e.target.value)} type="text" id="name" placeholder="Last name.." />
                                    </div>
                                    <div className="form-field">
                                    <input required className="form-control" value={this.state.shippingdata.email} onChange={(e)=>this.handleinput("email",e.target.value)} type="email" id="email" placeholder="Email.." />
                                    </div>
                                </div>
                                <hr />
                                <h3 className="text-center" style={{"color":"rgb(114, 37, 23)"}}>Shipping Address </h3>
                                <hr />
                                <div id="shipping-info">
                                    
                                    <div className="form-field">
                                    <input className="form-control" value={this.state.shippingdata.address} onChange={(e)=>this.handleinput("address",e.target.value)} required type="text" id="address" placeholder="Address.." />
                                    </div>
                                    <div className="form-field">
                                    <input className="form-control" value={this.state.shippingdata.city} onChange={(e)=>this.handleinput("city",e.target.value)} required type="text" id="city" placeholder="City.." />
                                    </div>
                                    <div className="form-field">
                                    <input className="form-control" value={this.state.shippingdata.state} required type="text" onChange={(e)=>this.handleinput("state",e.target.value)} id="state" placeholder="State.." />
                                    </div>
                                    <div className="form-field">
                                    <input className="form-control" value={this.state.shippingdata.zipcode} required type="text" onChange={(e)=>this.handleinput("zipcode",e.target.value)} id="zipcode" placeholder="Zip code.." />
                                    </div>
                                    <div className="form-field">
                                    <input className="form-control" value={this.state.shippingdata.country} required type="text" onChange={(e)=>this.handleinput("country",e.target.value)} id="country" placeholder="Country.." />
                                    </div>
                                    
                                </div>
                                <button type="submit"  id="btn-form" className="btn btn-success w-100">Continue</button> 
                                <hr></hr>
                        </form>
                        
                        </div>
                        <div className="summary box-element">
                            <Link className={this.state.showPayment?"page-hidden":"page-shown"} to="/cart">
                                <button className="btn btn-outline-dark"><Hi.HiOutlineArrowNarrowLeft/> Back to Cart</button>
                            </Link>
                            <div className={this.state.showPayment?"page-shown":"page-hidden"}>
                                <button  type="button" onClick={()=>{
                                    var current_state = this.state
                                    current_state.showPayment=false
                                    this.setState(current_state)
                                }} id="btn-payment" className="btn btn-outline-dark"><Hi.HiOutlineArrowNarrowLeft/> Back</button>
                            </div>
                            <hr></hr>
                            <h3 className="text-center" style={{"color":"rgb(114, 37, 23)"}}>Order Summary</h3>
                            <div className="summary-grid">
                                {this.state.order.orderitems.map((item,index)=>{
                            return(
                                <>
                                
                                <div className="item-OI" >
                                    <hr></hr>
                                    <Link to={"/product/"+String(item.product)}>
                                    <img
                                        className="row-image"
                                        src={app_data.url.replace("store","static") +  item.image}
                                        alt=""
                                    />
                                    </Link>
                                </div>
                                <div className="item-OI" >
                                    <hr></hr>
                                    <Link class="link black" to={"/product/"+String(item.product)}>
                                    {item.name}
                                    </Link>
                                </div>
                                <div  className="item-OI">
                                    <hr></hr>
                                    $<p1 id={"p"+String(item.product)}>{item.price}</p1>
                                </div>
                                
                                <div className="item-OI" >
                                    <hr></hr>
                                    
                                    <p1 class="total_single_item" id={"t"+String(item.product)}>x
                                    {item.quantity}
                                    </p1>
                                </div>
                                </>
        
                            )})}
                            </div>
                            <div className="checkout-totals">
                                <h5>
                                    Items <strong className="total-items">{" : "} {this.state.order.item}</strong>
                                </h5>
                                <h5>
                                Total:
                                <strong>
                                    {" "}
                                    $<p1 id="final_amount">{this.state.order.total}</p1>
                                </strong>
                                </h5>
                            </div>
                        </div>
                    </div>
                    
                </>
            )
        
    }
}
export default CheckoutComponent