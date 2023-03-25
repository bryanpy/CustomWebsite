let cart = JSON.parse(localStorage.getItem("cart"))

function addItemtoCart(name){
    cart[name] = 1
    localStorage.setItem("cart", JSON.stringify(cart))
}

function clearCart(){
    cart={}
    localStorage.setItem("cart", JSON.stringify({}))
}