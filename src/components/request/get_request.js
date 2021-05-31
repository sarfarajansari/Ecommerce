import app_data from "../app_data/app_data"
export default async function GetRequest(url,set,loaded="") {
    const response = await fetch(app_data.url+ url)
    const data = await response.json()
    set(data)
    if(loaded){
        loaded(0)
    }
    return data
}