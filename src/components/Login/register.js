import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Redirect ,Link} from "react-router-dom";
import "./login.css";
import app_data from "../app_data/app_data"

const Error = (props) => {
  if (props.error) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.error}
      </div>
    );
  }
  return <></>;
};
const Message = (props) => {
  if (props.message) {
    return (
      <div className="alert alert-success" role="alert">
        {props.message}
      </div>
    );
  }
  return <></>;
};
function generatePassword() {
  var length = 20,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      otp: "",
      redirect: false,
      message: "",
      creds: {
        email: "",
        otp: "",
        username: "",
        password1: "",
        password2: "",
        Fname:"",
        Lname:""
      },
    };
  }

  register = () => {
    var current_state = this.state;
    var password=this.state.creds.password1
    if(password===this.state.creds.password2 && password!==""){
        if(this.state.creds.password1.length>7){
            const requestdata = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(this.state.creds),
            };
            fetch( app_data.url.replace("store","auth") + "/register/", requestdata)
            .then((response) => {
            return response.json();
            })
            .then((data) => {
                console.log(data)
                if (data.status !== 0) {
                    current_state.error = data.message;
                    current_state.message = "";
                    
                } 
                else {
                    current_state.error = "";
                    current_state.message = data.message;
                    localStorage.setItem("Token",data.token)
                    setTimeout(() => {
                    var cs = this.state;
                    cs.redirect = true;
                    this.setState(cs);
                    }, 1000);
                }
                this.setState(current_state)
            });
        }
        else{
            current_state.message=""
            current_state.error="Password should contain minimum of 8 letters"
        }
    }
    else{
        current_state.message=""
        current_state.error="Password did not match"
    }
    this.setState(current_state)
    
  };
  responseGoogle = (response) => {
    var profile = response.profileObj
    console.log(profile);
    var current_state = this.state;
    current_state.creds.email = profile.email;
    current_state.creds.Lname = profile.familyName;
    current_state.creds.Fname = profile.givenName;


    var array =profile.name.split(" ",4)
    var username=""
    array.forEach((item)=>username+=item)
    username+=profile.googleId.substring(0,4)

    current_state.creds.username=username
    current_state.creds.password1=generatePassword()
    current_state.creds.password2=current_state.creds.password1
    this.setState(current_state);
    
    console.log(current_state)
    this.register()
  };
  handleinput(index, value) {
    var current_state = this.state;
    current_state.creds[index] = value;
    this.setState(current_state);
  }
  getOtp=()=>{
    const requestdata = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email:this.state.creds.email
      }),
    };
    fetch( app_data.url.replace("store","auth") + "/otp/", requestdata)
    .then((response) => {
    return response.json();
    })
    .then((data)=>{
        console.log(data)
        var current_state = this.state
        if (data.status===0){
            current_state.error=""
            current_state.message=data.message
            current_state.otp=data.otp
        }
        else{
            current_state.error=data.message
            current_state.message=""
        }
        this.setState(current_state)
    })
  }

  pass_class=()=>{
    if(this.state.creds.password1==="" && this.state.creds.password2===""){
      return "form-control"
    }
    else if(this.state.creds.password1===this.state.creds.password2){
      return "form-control g"
    }
    else{
      return "form-control r"
    }
  }
  render() {
    if (this.state.redirect || localStorage.getItem("Token")!==null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-grid">
        <form
          className="login-form box-element"
          onSubmit={(e) => {
            e.preventDefault()
            var otp = this.state.otp
            console.log(otp)
            if(String(otp)===String(this.state.creds.otp) && otp!==""){
                this.register()
            }
            else{
                var current_state= this.state
                current_state.message=""
                current_state.error="Incorrect otp"
                this.setState(current_state)
            }
          }}
        >
          <h1 className="text-center" style={{ color: "salmon" }}>
            Sign up
          </h1>
          <Error error={this.state.error} />
          <Message message={this.state.message} />
          <div>
            <div className="input-group mb-3">
              <input
                type="email"
                name="email"
                value={this.state.creds.email}
                onChange={(e) => this.handleinput("email", e.target.value)}
                className="form-control"
                placeholder="Email"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                required
              />
              <button
                className="btn w-25 btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={this.getOtp}
              >
                Get OTP
              </button>
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text w-50 row"
                id="inputGroup-sizing-default"
              >Enter otp
              </span>
              <input
                type="number"
                value={this.state.creds.otp}
                onChange={(e) => this.handleinput("otp", e.target.value)}
                name="OTP"
                autoComplete="OTP"
                autofocus
                required
                id="id_OTP"
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text w-50 row"
                id="inputGroup-sizing-default"
              >
                {"First name & Last name"}
              </span>
              <input
                type="text"
                value={this.state.creds.Fname}
                onChange={(e) => this.handleinput("Fname", e.target.value)}
                name="Fname"
                maxLength={150}
                autoComplete="first name"
                autofocus
                required
                id="id_username"
                className="form-control"
              />
              <input
                type="text"
                value={this.state.creds.Lname}
                onChange={(e) => this.handleinput("Lname", e.target.value)}
                name="Lname"
                maxLength={150}
                autoComplete="last name"
                autofocus
                required
                id="id_username"
                className="form-control"
              />
            </div>
            

            <div className="input-group mb-3">
              <span
                className="input-group-text w-50 row"
                id="inputGroup-sizing-default"
              >
                Username
              </span>
              <input
                type="text"
                value={this.state.creds.username}
                onChange={(e) => this.handleinput("username", e.target.value)}
                name="username"
                maxLength={150}
                autoCapitalize="none"
                autoComplete="username"
                autofocus
                required
                id="id_username"
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text w-50 row"
                id="inputGroup-sizing-default"
              >
                Password
              </span>
              <input
                type="password"
                value={this.state.creds.password1}
                onChange={(e) => this.handleinput("password1", e.target.value)}
                name="password1"
                autoCapitalize="none"
                autoComplete="new-password"
                autofocus
                required
                id="id_password1"
                className={this.pass_class()}
                pb-role="password"
              />
              <br />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text w-50 row"
                id="inputGroup-sizing-default"
              >
                Confirm Password
              </span>
              <input
                type="password"
                value={this.state.creds.password2}
                onChange={(e) => this.handleinput("password2", e.target.value)}
                name="password2"
                autoCapitalize="none"
                autoComplete="new-password"
                autofocus
                required
                id="id_password2"
                
                className={this.pass_class()}
                pb-role="password"
              />
              <br />
            </div>
          </div>

          <div className="login-flex">
            <input
              className="btn btn-success salmon Google"
              type="submit"
              value="Sign Up"
              defaultValue="login"
            />
          </div>
          <div >
            <br></br>
            <p1>
              Already have an account?
              <Link className="link" to="/login">
                Login
              </Link>
            </p1>
          </div>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              className="Google"
              clientId="835452839430-l5n0a3vbl1ofo9cdv6928cid6mk65hm7.apps.googleusercontent.com"
              buttonText="sign up with Google"
              onSuccess={this.responseGoogle}
              onFailure={()=>{
                var current_state=this.state
                current_state.message=""
                current_state.error="Google login Failed"
                this.setState(current_state)
              }}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
      </div>
    );
  }
}


