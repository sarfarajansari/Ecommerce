import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import {Link, Redirect} from "react-router-dom"
import "./login.css"
const Error=(props)=>{
    if(props.error){
        return(
            <div className="alert alert-danger" role="alert">
                {props.error}
            </div>
        )
    }
    return <></>
}
const Message=(props)=>{
    if(props.message){
        return(
            <div className="alert alert-success" role="alert">
                {props.message}
            </div>
        )
    }
    return <></>
}
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            error:"",
            email:"",
            redirect:false,
            message:"",
            userData:{
                status:1
            }
        }
    }
    componentDidMount(){
        fetch("/api/check/authenticated/")
        .then((response)=>{
        return response.json()
        })
        .then((data)=>{
            var current_state = this.state
            current_state.userData=data
            this.setState(current_state)
        })
        }
    login=()=>{
        const csrftoken = getCookie('csrftoken');
        const requestdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password,
                type:1
            })
        }
        fetch("/api/login/",requestdata)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            var current_state=this.state
            if(data.status!==0){
                current_state.error = data.message
                current_state.message=""
            }
            else{
                current_state.error=""
                current_state.message= data.message
                setTimeout(() => {
                    var cs = this.state
                    cs.redirect=true
                    this.setState(cs)
                },1000);
            }
            this.setState(current_state)
        })
    }
    responseGoogle=(response)=>{
        console.log(response.profileObj.email);
        var current_state = this.state
        current_state.email = response.profileObj.email
        this.setState(current_state)
        const csrftoken = getCookie('csrftoken');
        const requestdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',"X-CSRFToken":csrftoken },
            body:JSON.stringify({
                email:response.profileObj.email,
                type:2,
            })
        }
        console.log(requestdata)
        fetch("/api/login/",requestdata)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            var current_state=this.state
            if(data.status!==0){
                current_state.error = data.message
                current_state.message=""
            }
            else{
                current_state.error=""
                current_state.message= data.message
                setTimeout(() => {
                    var cs = this.state
                    cs.redirect=true
                    this.setState(cs)
                },1000);
            }
            this.setState(current_state)
        })
    }
    handleinput(index,value){
        var current_state = this.state
        current_state[index]=value
        this.setState(current_state)
    }
    render() {
        if(this.state.redirect || this.state.userData.status===0){
            return <Redirect to="/"/>
        }
        return (
            <div className="login-grid">
                <form className="login-form box-element" onSubmit={(e)=>{
                    e.preventDefault()
                    this.login()
                }}>
                        <h1 className="text-center" style={{"color":"salmon"}}>LOGIN</h1>
                        <Error error={this.state.error}/>
                        <Message message={this.state.message}/>
                    <div className="input-group mb-3">
                        <span className="input-group-text w-50 row" id="inputGroup-sizing-default">Username</span>
                        <input type="text" value={this.state.username} onChange={(e)=>this.handleinput("username",e.target.value)} name="username" maxLength={150} autoCapitalize="none" autoComplete="username" autofocus required id="id_username" className="form-control" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text w-50 row" id="inputGroup-sizing-default">Password</span>
                        <input type="password" value={this.state.password} onChange={(e)=>this.handleinput("password",e.target.value)} name="password" autoCapitalize="none" autoComplete="new-password" autofocus required id="id_password" className="form-control" pb-role="password" /><br />
                    </div>
                    <div className="login-flex">
                        <input className="btn btn-success salmon Google" type="submit" value="login" defaultValue="login" />
                    </div>
                    <div className="">
                        <br></br>
                    <p1>Dont have an account?<Link className="link" to="/register"> sign up</Link></p1>
                    </div>
                    <br></br>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <GoogleLogin
                        className="Google"
                        clientId="835452839430-l5n0a3vbl1ofo9cdv6928cid6mk65hm7.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={()=>{
                            var current_state=this.state
                            current_state.message=""
                            current_state.error="Google login Failed"
                            this.setState(current_state)
                          }}
                        cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    
                </form>

                
            
            </div>
        )
    }
}


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