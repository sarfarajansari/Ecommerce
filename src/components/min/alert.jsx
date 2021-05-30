
function Alert(props) {
    if(props.message){
        return (
            <div  className={"alert alert-success"} id="msg-alert" role="alert">
                {props.message}
            </div>
        )
    }
    return <></>
}

export default Alert
