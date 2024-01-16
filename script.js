let url="https://localhost:7140/api/Products/"
var xhr= new XMLHttpRequest()
let products=[]

function requestFactory(method,url,body){
    xhr.onload=function() {feldolgozo(method)}
    xhr.open(method, url, true)
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.setRequestHeader("Accept","application/json")
    xhr.send(JSON.stringify(body))
}

function feldolgozo(method){
 console.log(xhr.status)
//  console.log("response",xhr.responseText)
 if (method=="get" && xhr.status==200){
    products=JSON.parse(xhr.responseText)
    render()
 }
 if (method=="post" && xhr.status==201)  {
    requestFactory("get",url)
 } 
 if (method=="put" && xhr.status==204)  {
    requestFactory("get",url)
 } 
 if (method=="delete" && xhr.status==204)  {
    requestFactory("get",url)
 } 
 

}
function render(){
    console.log(products)
    tarolo= document.getElementById("products")
    tarolo.innerHTML=""
    for (const product of products) {
        sor=document.createElement('div')
        sor.className="row"

        nev=document.createElement('div')
        nev.className="col"
        //nev.innerHTML=product.name 
        nev.innerHTML=`
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="${product.id}name" value="${product.name}">
            <label for="floatingInput">Név</label>
        </div>`
        sor.appendChild(nev)

        price=document.createElement('div')
        price.className="col"
        //price.innerHTML=product.price 
        price.innerHTML=`
        <div class="form-floating mb-3">
        <input type="number" class="form-control" id="${product.id}price" value="${product.price}">
        <label for="floatingInput">Ár</label>
        </div>`
        sor.appendChild(price)

        gombok=document.createElement('div')
        gombok.className="col"
        gombok.innerHTML=`
        <button onclick="mentes(${product.id})" type="button" class="btn btn-primary">Mentés</button>
        <button onclick="torles(${product.id})"type="button" class="btn btn-primary">Törlés</button>
        <button onclick="ujTermek(${product.id})"type="button" class="btn btn-primary">Új</button>
        `
        sor.appendChild(gombok)

        tarolo.appendChild(sor)
    }
}
function mentes(id){
    let body= adat(id)
    body.id=id
    console.log("Body", body)
    requestFactory("put",url+id, body)
}
function torles(id){
    requestFactory("delete",url+id)
}
function ujTermek(id){
    console.log("Új:",id)
    let body= adat(id)
    requestFactory("post",url,body)
}

function adat(id){
    nev= document.getElementById(id+"name").value
    ar= document.getElementById(id+"price").value
    console.log(nev, ar)
    return {name:nev, price:ar}
}

requestFactory("get",url)