const Error=(props)=>{
    if(props.status===1){
        return(
            <div className="alert alert-danger" role="alert">
                {props.error}
            </div>
        )
    }
    return <></>
}

export default Error