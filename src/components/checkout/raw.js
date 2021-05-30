// class CheckoutComponent extends React.Component{
//     componentDidMount(){
//         this.getOrderItems()
//         this.get_cart_total()
//     }
    
//     constructor(props) {
//         super(props);
//         this.state = {
//           loaded:false,
//           showPayment:false,
//           orderitems:[],
//           shippingdata:{
//               "name":"",
//               "email":"",
//               "address":"",
//               "state":"",
//               "zipcode":"",
//               "country":"",
//               "city":""
//           },
//           cart_total:{}
//         };
//       }

    // get_cart_total() {
    //     var url = "/api/cartdetails/?format=json"
    //     fetch(url)
    //     .then((response)=>{
    //         return response.json()
    //     })
    //     .then((data)=>{
    //         console.log(data)
    //         this.setState({
    //             cart_total:data,
    //             loaded:this.state.loaded,
    //             showPayment:this.state.showPayment,
    //             orderitems:this.state.orderitems,
    //             shippingdata:this.state.shippingdata
                
    //         })
    //     })
        
    //     console.log(this.state.cart_total)
    //    }
    // getOrderItems() {
    //     var url = 'http://127.0.0.1:8000/api/orderitems/?format=json';
    //     fetch(url)
    //     .then((response)=>{
    //         return response.json()
    //     })
    //     .then((data)=>{
            
    //         this.setState({
    //             orderitems:data,
    //             loaded:true,
    //             showPayment:this.state.showPayment,
    //             shippingdata:this.state.shippingdata,
    //             cart_total:this.state.cart_total
    //         })
    //         console.log(this.state.orderitems)
    //     })   
    // }
    // render() {
    //     if(!this.state.loaded){
    //         return <Loading/>
    //       }
    //     if(this.state.showPayment){
    //         return(
    //         <div className="checkout-grid">
    //                 <div className="payment box-element">
    //                 <button type="submit" id="btn-payment" onClick="submit data" className="btn btn-success w-100">Make Payment</button>
                    // <hr></hr>
    //                 </div>
    //                 <div className="summary box-element">
    //                     <Link to="cart">
    //                         <button className="btn btn-outline-dark"><Hi.HiOutlineArrowNarrowLeft/> Back to Cart</button>
    //                     </Link>
    //                     <hr></hr>
    //                     <h3 className="text-center" style={{"color":"rgb(114, 37, 23)"}}>Order Summary</h3>
    //                     <div className="summary-grid">
    //                         {this.state.orderitems.map((item,index)=>{
    //                     return(
    //                         <>
                            
    //                         <div className="item-OI" >
    //                             <hr></hr>
    //                             <a href="{% url 'product' item.product.id %}">
    //                             <img
    //                                 className="row-image"
    //                                 src={item.image}
    //                                 alt=""
    //                             />
    //                             </a>
    //                         </div>
    //                         <div className="item-OI" >
    //                             <hr></hr>
    //                             <a class="link black" href="{% url 'product' item.product.id %}">
    //                             {item.name}
    //                             </a>
    //                         </div>
    //                         <div  className="item-OI">
    //                             <hr></hr>
    //                             $<p1 id="p{{item.product.id}}">{item.price}</p1>
    //                         </div>
                            
    //                         <div className="item-OI" >
    //                             <hr></hr>
                                
    //                             <p1 class="total_single_item" id="t{{item.product.id}}">x
    //                             {item.quantity}
    //                             </p1>
    //                         </div>
    //                         </>
    
    //                     )})}
    //                     </div>
    //                     <div className="checkout-totals">
    //                         <h5>
    //                             Items : <strong className="total-items">{" "} {this.state.cart_total.item}</strong>
    //                         </h5>
    //                         <h5>
    //                         Total:
    //                         <strong>
    //                             {" "}
    //                             $<p1 id="final_amount">{this.state.cart_total.total}</p1>
    //                         </strong>
    //                         </h5>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
        // if (!this.state.showPayment){
        //     return (
        //         <div className="checkout-grid">
        //             <div className="payment box-element">
        //             <div>
        //             <div id="user-info">
        //                         <div className="form-field">
        //                         <input required className="form-control" type="text" id="name" placeholder="Name.." />
        //                         </div>
        //                         <div className="form-field">
        //                         <input required className="form-control" type="email" id="email" placeholder="Email.." />
        //                         </div>
        //                     </div>
        //                     <hr />
        //                     <h3 className="text-center" style={{"color":"rgb(114, 37, 23)"}}>Shipping Address </h3>
        //                     <hr />
        //                     <div id="shipping-info">
                                
        //                         <div className="form-field">
        //                         <input className="form-control" required type="text" id="address" placeholder="Address.." />
        //                         </div>
        //                         <div className="form-field">
        //                         <input className="form-control" required type="text" id="city" placeholder="City.." />
        //                         </div>
        //                         <div className="form-field">
        //                         <input className="form-control" required type="text" id="state" placeholder="State.." />
        //                         </div>
        //                         <div className="form-field">
        //                         <input className="form-control" required type="text" id="zipcode" placeholder="Zip code.." />
        //                         </div>
        //                         <div className="form-field">
        //                         <input className="form-control" required type="text" id="country" placeholder="Country.." />
        //                         </div>
                                
        //                     </div>
        //                     <button type="button" onClick={()=>{
        //                         var name = document.getElementById("name").value;
        //                         var email  = document.getElementById("email").value;
        //                         var address  = document.getElementById("address").value;
        //                         var city  = document.getElementById("city").value;
        //                         var state  = document.getElementById("state").value;
        //                         var zipcode  = document.getElementById("zipcode").value;
        //                         var country  = document.getElementById("country").value;
        //                         var data = {
        //                             "name":name,
        //                             "email":email,
        //                             "address":address,
        //                             "city":city,
        //                             "state":state,
        //                             "zipcode":zipcode,
        //                             "country":country
        //                         }
        //                         this.state = {
        //                             cart_total:this.state.cart_total,
        //                             loaded:this.state.loaded,
        //                             showPayment:true,
        //                             orderitems:this.state.orderitems,
        //                             shippingdata:data
        //                           };
        //                         console.log(this.state.shippingdata,this.state.showPayment)
        //                     }} id="btn-form" className="btn btn-success w-100">Continue</button> 
        //                     <hr></hr>
        //             </div>
                    
        //             </div>
        //             <div className="summary box-element">
        //                 <Link to="cart">
        //                     <button className="btn btn-outline-dark"><Hi.HiOutlineArrowNarrowLeft/> Back to Cart</button>
        //                 </Link>
        //                 <hr></hr>
        //                 <h3 className="text-center" style={{"color":"rgb(114, 37, 23)"}}>Order Summary</h3>
        //                 <div className="summary-grid">
        //                     {this.state.orderitems.map((item,index)=>{
        //                 return(
        //                     <>
                            
        //                     <div className="item-OI" >
        //                         <hr></hr>
        //                         <a href="{% url 'product' item.product.id %}">
        //                         <img
        //                             className="row-image"
        //                             src={item.image}
        //                             alt=""
        //                         />
        //                         </a>
        //                     </div>
        //                     <div className="item-OI" >
        //                         <hr></hr>
        //                         <a class="link black" href="{% url 'product' item.product.id %}">
        //                         {item.name}
        //                         </a>
        //                     </div>
        //                     <div  className="item-OI">
        //                         <hr></hr>
        //                         $<p1 id="p{{item.product.id}}">{item.price}</p1>
        //                     </div>
                            
        //                     <div className="item-OI" >
        //                         <hr></hr>
                                
        //                         <p1 class="total_single_item" id="t{{item.product.id}}">x
        //                         {item.quantity}
        //                         </p1>
        //                     </div>
        //                     </>
    
        //                 )})}
        //                 </div>
        //                 <div className="checkout-totals">
        //                     <h5>
        //                         Items : <strong className="total-items">{" "} {this.state.cart_total.item}</strong>
        //                     </h5>
        //                     <h5>
        //                     Total:
        //                     <strong>
        //                         {" "}
        //                         $<p1 id="final_amount">{this.state.cart_total.total}</p1>
        //                     </strong>
        //                     </h5>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }

    // }
// }

// function CC() {
//     const [orderitems, setorderitems] = useState([])
//     const [cart_total, setcart_total] = useState({})
//     const [Shippingdata, setShippingdata] = useState({})

//     const [loaded, setloaded] = useState(false)
//     const [showPayment, setshowPayment] = useState(false)



    // function get_shipping_data() {
    //     var name = document.getElementById("name").value;
    //     var email  = document.getElementById("email").value;
    //     var address  = document.getElementById("address").value;
    //     var city  = document.getElementById("city").value;
    //     var state  = document.getElementById("state").value;
    //     var zipcode  = document.getElementById("zipcode").value;
    //     var country  = document.getElementById("country").value;
    //     var data = {
    //         "name":name,
    //         "email":email,
    //         "address":address,
    //         "city":city,
    //         "state":state,
    //         "zipcode":zipcode,
    //         "country":country
    //     }
    //     setShippingdata(data)
    //     console.log(Shippingdata)

    // }

    // async function submitdata() {
        // const csrftoken = getCookie('csrftoken');
        // var url =  "/api/submit/order/"
        // const requestdata = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken },
        //     body:JSON.stringify(Shippingdata)
        // }
        // var response = await fetch(url,requestdata)
        // var data = await  response.json()
        // console.log(data)
        
    // }
//     console.log(Shippingdata)







// }

    // async function updatequantity(obj,id) {
    //   const csrftoken = getCookie('csrftoken');
    //     const requestOptions = {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken },
    //         body:JSON.stringify(obj)
    //     };
    //     const url ="/api/orderitem/" + String(id) +"/"
    //     const response = await fetch(url, requestOptions);
    //     const data = await response.json();
    //     setcartload(false)
    //     get_order()
    // }
    // function updatecart(index,action) {
    //   var data =order.orderitems[index]
    //   var newdata;
    //   if (action == "add"){
    //     setloadtext("Adding to Cart..")
    //     setcartload(true)
    //     newdata = {
    //       "quantity":data["quantity"]+1,
    //       "product" : data["product"],
    //       "order":data["order"]
    //     }
    //   }

    //   else{
    //     setloadtext("Removing from Cart..")
    //     setcartload(true)
    //     newdata = {
    //       "quantity":data["quantity"]-1,
    //       "product" : data["product"],
    //       "order":data["order"]
    //       }
    //     }
    //   console.log(newdata,data["orderitemId"])
    //   updatequantity(newdata,data["orderitemId"])
    // }