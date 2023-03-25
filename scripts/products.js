import products from '../data/products.json' assert {type: 'json'};

let productGrid = document.getElementById("product-grid")
let productContainer = document.createElement("div")

let searchState = false

let toDisplay = products;

productContainer.classList.add("product-container")
productGrid.appendChild(productContainer)

document.getElementById("search-button").addEventListener("click", ()=>{
    search()
})

document.addEventListener("keydown", (e)=>{
    if(e.key == "Enter") {
        search()
    }
})

document.addEventListener("click",(e)=>{
    display()

})

display()

function search() {
    console.log(searchState)
    if(searchState == false){
        toDisplay = searchItems(toDisplay, document.getElementById("header-search").value)
        display()
        searchState = true
        document.getElementById("search-button").classList.remove("fa-magnifying-glass")
        document.getElementById("search-button").classList.add("fa-xmark")
    }else{
        toDisplay = products
        display()
        searchState = false

        document.getElementById("search-button").classList.add("fa-magnifying-glass")
        document.getElementById("search-button").classList.remove("fa-xmark")
        document.getElementById("header-search").value = ""
    }
}

function display() {
    productGrid.innerHTML = ""

    let tempJson = {}

    for (let x = 0; x < Object.keys(toDisplay).length; x++) {
        if (Object.values(toDisplay)[x]['category'].includes(filter["category"]) || filter["category"] == "all"){
            if(Object.values(toDisplay)[x]['rate'] >= filter["rating"]) {
                tempJson[Object.keys(toDisplay)[x]] = Object.values(toDisplay)[x]
            }
        }
    }

    if(Object.keys(tempJson).length == 0){
        productGrid.innerHTML = "Item Not Found"
        productGrid.style.color = "black"
        productGrid.style.textAlign = "center"
        productGrid.style.marginTop = "300px"
        return
    }else{
        productGrid.style.textAlign = "center"
        productGrid.style.marginTop = "0px"
    }
    for (let x = 0; x < Object.keys(tempJson).length; x++) {
        let product = document.createElement("div")
        if ((((x / 5) + 1) % 1) != 0) {

            product.classList.add("product")

            product.innerHTML = createItem(Object.keys(tempJson)[x], Object.keys(tempJson)[x], Object.values(tempJson)[x]["price"])

            productContainer.appendChild(product)
        } else {
            productContainer = document.createElement("div")
            productContainer.classList.add("product-container")
            productGrid.appendChild(productContainer)

            product.classList.add("product")

            product.innerHTML = createItem(Object.keys(tempJson)[x], Object.keys(tempJson)[x], Object.values(tempJson)[x]["price"])

            productContainer.appendChild(product)


        }
    }
}

function createItem(imageName,productName,price){
    return(
        '<img onclick="window.location = \'../pages/productInfo.html?product='+ productName +'\'" src="../assets/productPictures/'+ imageName +'.jpg" alt="Image" class="product-image">\n' +
            '<div><h2 onclick="window.location = \'../pages/productInfo.html?product='+ productName +'\'" id="product-name" class="product-text text">'+ products[productName]["description"].slice(0,100).replace(/[0-9]/g, '') +'</h2>\n' +
            '<h2 id="product-price" class="product-text text">'+ price +'₹</h2>\n' +
            '<h2 id="product-rating" class="product-text text">'+ calcStars(products[productName]["rate"]) +'</h2>\n' +
            '<h2 id="product-addtocart" class="product-text text" onclick=\'addItemtoCart("'+productName+'")\'>+Add to Cart</h2></div></div>'
    )
}



function searchItems(json,keyword) {
    let tempJson = {}
    for (let x = 0; x < Object.keys(json).length; x++) {
        if(toDisplay[Object.keys(toDisplay)[x]]["description"].toLowerCase().includes(keyword)) {
            tempJson[Object.keys(toDisplay)[x]] = Object.values(toDisplay)[x]
        }
    }
    console.log(tempJson)
    return (tempJson)
}

function calcStars(rating){
    let moons = ["🌕","🌘","🌗","🌖","🌑"]
    let rate = ""
    for (let x = 0; x < Math.floor(rating); x++) {
        rate += moons[0]
    }

    let empRate = ""
    for (let x = 0; x < Math.floor(5-rating); x++) {
        empRate += moons[4]
    }
    let des = rating-Math.floor(rating)

    let desmoon = ""
    if(des < 0.5 && des != 0)
        desmoon = "🌘"
    else if(des > 0.5)
        desmoon = "🌖"
    else if(des == 0.5)
        desmoon = "🌗"

    return("Rating: "+rate+desmoon+empRate+" "+rating)
}

function setFilterProperty(property,value){
    filter[property] = value
}