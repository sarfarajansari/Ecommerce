import React,{useState} from "react";
import "./about.css";
import {AiTwotoneMail,AiFillTwitterCircle,AiFillGithub} from "react-icons/ai"
import {FcHome} from "react-icons/fc"
import {CgInstagram} from "react-icons/cg"
import {ImLinkedin} from "react-icons/im"
import app_data from "../app_data/app_data"


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
const AlertMessage=(props)=>{
    if(props.message){
        return(
            <div className="alert alert-success" role="alert">
                {props.message}
            </div>
        )
    }
    return <></>
}
export default function About() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [text, settext] = useState("");
    const [Alert, setAlert] = useState({
        message:"",
        error:""
    });
    const send_message=()=>{
        const requestdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify({
                "name":name,
                "email":email,
                "text":text
            })
        }
        fetch(app_data.url + "/api/message/",requestdata)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            if(data.status!==0){
                setAlert({
                    message:"",
                    error:data.message
                })
            }
            else{
                setAlert({
                    message:data.message,
                    error:""
                })
                setname("")
                setemail("")
                settext("")
            }
        })
    }
  return (
    <div className="about-us box-element">
      <div id="about">
        <div className="about-salmon">
          <h1 className="text-center">About us</h1>
        </div>
        <p className="info">
          The Awesome Store is an example ecommerce site developed with React js
          and Django . It has all the features that a ecommerce site should have
          . Both authenticated users as well as guest users can add products to
          cart and shop .
        </p>
      </div>
      <br></br>
      <div id="contact">
        <div className="about-salmon">
          <h1 className="text-center">Contact us</h1>
        </div>
        <br></br>
        <Error error={Alert.error}/>
        <AlertMessage message={Alert.message}/>
        <div id="message">
          <h4 className="head-text">Message :</h4>
          <form onSubmit={(e)=>{
              e.preventDefault()
              send_message()

          }}>
            <div>
              <input type="text" value={name} onChange={(e)=>setname(e.target.value)} required placeholder="Name" />
              <input type="email" value={email} onChange={(e)=>setemail(e.target.value)}  required placeholder="Email" />
            </div>
            <textarea required placeholder="Message" value={text} onChange={(e)=>settext(e.target.value)}  rows="5"></textarea>
            <button type="submit"   className="btn btn-outline-secondary add-btn update-cart">
              Send message
            </button>
          </form>
        </div>
        <div className="social">
             <div className="social-item">
                 <h4> <AiTwotoneMail className="social-icon"/>Email</h4>
                 <a href="mailto:com.theawesomestore@gmail.com">com.theawesomestore@gmail.com</a>

             </div>
             <div className="social-item">
                 <h4> <FcHome className="social-icon"/>Address</h4>
                 <a href="https://goo.gl/maps/rUa2PvHDs2dafhZJA"><p1>Mahim , Mumbai,</p1><p1>Maharashtra,</p1><p1>India- 400017</p1></a>

             </div>
             <div className="social-item">
                 <h4> Social</h4>
                 <a href="https://twitter.com/Sarfraj49393426"><AiFillTwitterCircle  className="social-icon main"/></a>
                 <a href="https://www.instagram.com/sarfarajansari_/"><CgInstagram className="social-icon main"/></a>
                 <a href="https://github.com/sarfarajansari"><AiFillGithub className="social-icon main"/></a>
                 <a href="https://www.linkedin.com/in/sarfaraj-ansari-a0a9441b9/"><ImLinkedin className="social-icon main"/></a>

             </div>
        </div>
      </div>
    </div>
  );
}
