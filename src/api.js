const url='https://api.coincap.io/v2'

function getAssets() {
    return fetch(`${url}/assets?limit=30`)
    .then(res=>res.json())
    .then(res => res.data)
}
function getAsset(coin) {
    var myHeaders=new Headers()
    var myInit={
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }
    var myRequest =new Request(`${url}/assets/${coin}`,myInit)
    return fetch(myRequest)
    .then(res=>res.json())
    .then(res=>res.data)
}
function getAssetHistory(coin) {
    var myHeaders=new Headers()
    var myInit={
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }
    const now=new Date()
    const end= now.getTime()
    now.setDate(now.getDate()-1)
    const start= now.getTime()
    var myRequest =new Request(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`,myInit)
    return fetch(myRequest)
    .then(res=>res.json())
    .then(res=>res.data)
}
function getMarkets(coin) {
    return fetch(`${url}/assets/${coin}/markets?limit=6`)
        .then(res=>res.json())
        .then(res=>res.data)
}
function getExchange(id){
    return fetch(`${url}/exchanges/${id}`)
        .then(res=>res.json())
        .then(res=>res.data)
}
export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchange
}