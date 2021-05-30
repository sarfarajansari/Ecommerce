import app_data from "../app_data/app_data"
export default function Postreq(url,body,set="",loaded=""){
    body.session = JSON.parse( localStorage.getItem('session'))
    console.log(JSON.parse( localStorage.getItem('session')))
    var headers = { 'Content-Type': 'application/json' }
    if (localStorage.getItem('token') !== null){
        headers["Authorization"]="Token " + localStorage.getItem('token')
    }
    const requestdata = {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(body)
    }
    fetch(app_data.url+ url,requestdata)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        if (set){
            set(data)
        }
        if (loaded){
            loaded(0)
        }
        if ("session" in data){
            localStorage.setItem("session",JSON.stringify(data.session))
        }

    })
}