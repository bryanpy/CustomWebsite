import products from '../data/products.json' assert {type: 'json'};

let productGrid = document.getElementById("product-grid")
let productContainer = document.createElement("div")

productContainer.classList.add("product-container")
productGrid.appendChild(productContainer)

let searchState = false

document.getElementById("search-button").addEventListener("click", ()=>{
    search()
})

document.addEventListener("keydown", (e)=>{
    if(e.key == "Enter") {
        search()
    }
})

let toDisplay = products;

display()

function search() {
    if(searchState == false) {
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
    if(Object.keys(toDisplay).length == 0){
        productGrid.innerHTML = "Item Not Found"
        productGrid.style.color = "white"
        productGrid.style.textAlign = "center"
        productGrid.style.marginTop = "300px"
        return
    }else{
        productGrid.style.textAlign = "center"
        productGrid.style.marginTop = "0px"
    }
    for (let x = 0; x < Object.keys(toDisplay).length; x++) {
        // console.log((((x / 4)+1) % 1))
        if ((((x / 4) + 1) % 1) != 0) {
            let product = document.createElement("div")
            product.classList.add("product")

            product.innerHTML = createItem(Object.keys(toDisplay)[x], Object.keys(toDisplay)[x], Object.values(toDisplay)[x]["price"])



            productContainer.appendChild(product)
        } else {
            productContainer = document.createElement("div")
            productContainer.classList.add("product-container")
            productGrid.appendChild(productContainer)

            let product = document.createElement("div")
            product.classList.add("product")

            product.innerHTML = createItem(Object.keys(toDisplay)[x], Object.keys(toDisplay)[x], Object.values(toDisplay)[x]["price"])

            productContainer.appendChild(product)
        }
    }
}

function createItem(imageName,productName,price){
    return(
        '<img src="../assets/productPictures/'+ imageName +'.jpg" alt="Image" class="product-image">\n' +
            '<h2 class="product-text text">'+ productName.replace(/[0-9]/g, '') +'</h2>\n' +
            '<h2 class="product-text text">'+ price +'₹</h2>\n' +
            '<div style="display: flex,flex-direction: column;"><button class="product-order-button" onclick="window.location = \'../pages/productInfo.html?product='+
        productName +'\'">Order Now</button>\n'+
            '<button class="product-order-button" onclick="window.location = \'../pages/productInfo.html?product='+
            productName +'\'">Add to Cart</button></div>'
    )
}

function searchItems(json,keyword) {
    let tempJson = {}
    for (let x = 0; x < Object.keys(json).length; x++) {
        if(Object.keys(toDisplay)[x].toLowerCase().includes(keyword)) {
            tempJson[Object.keys(toDisplay)[x]] = Object.values(toDisplay)[x]
            // console.log(Object.values(toDisplay)[x])
        }
    }
    return (tempJson)
}