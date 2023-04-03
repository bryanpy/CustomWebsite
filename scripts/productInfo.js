import products from '../data/products.json' assert {type: 'json'};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')

document.getElementById("add-to-cart").addEventListener("click", (e)=>{
    addItemtoCart(product)
})

document.getElementById("product-image").src = "../assets/productPictures/"+product+".jpg"
document.getElementById("product-name").innerHTML = product.replace(/[0-9]/g, '');
document.getElementById("product-price").innerHTML = products[product]["price"]+"₹"
document.getElementById("product-description").innerHTML = products[product]["description"]
document.getElementById("product-rating").innerHTML = calcStars(products[product]["rate"])

let reviewParent = document.getElementById("product-review-holder")


reviewParent.innerHTML =   `<p class="product-review-name">${products[product]["reviews"][0]["name"]}</p>
                            <p class="product-review-review">${products[product]["reviews"][0]["text"]}</p>
                            <p class="product-review-stars">${calcStars(products[product]["reviews"][0]["stars"])}</p><br><br>
                            <p class="product-review-name">${products[product]["reviews"][1]["name"]}</p>
                            <p class="product-review-review">${products[product]["reviews"][1]["text"]}</p>
                            <p class="product-review-stars">${calcStars(products[product]["reviews"][1]["stars"])}</p><br><br>
                            <p class="product-review-name">${products[product]["reviews"][2]["name"]}</p>
                            <p class="product-review-review">${products[product]["reviews"][2]["text"]}</p>
                            <p class="product-review-stars">${calcStars(products[product]["reviews"][2]["stars"])}</p><br><br>
                            `


let randint = Math.floor(Math.random() * Object.keys(products).length)
let randprod = Object.keys(products)[randint]
document.getElementById("product-suggestion-image").src = "../assets/productPictures/"+randprod+".jpg"
document.getElementById("product-suggestion-name").innerHTML = randprod.replace(/[0-9]/g, '');
document.getElementById("product-suggestion-price").innerHTML = products[randprod]["price"]+"₹   " + calcStars(products[randprod]["rate"])
document.getElementById("product-suggestion-description").innerHTML = products[randprod]["description"]

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