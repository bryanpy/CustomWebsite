import products from '../data/products.json' assert {type: 'json'};

// <div className="cart-container">
//     <img className="cart-image" src="../assets/productPictures/Alexa.jpg" alt="alexa">
//         <div>
//             <h1 className="cart-name">Alexa</h1><br>
//             <h3 className="cart-disc">ervesvervesvevetavesv</h3><br>
//             <h3 className="cart-price">400</h3>
//         </div>
// </div>

console.log(cart)

let grid = document.getElementById("cart-grid")

for (let x = 0; x < Object.keys(cart).length; x++) {
    let cartItem = document.createElement("div")
    console.log(Object.keys(cart)[x])
    cartItem.innerHTML=`<div class="cart-container">
      <img class="cart-image" src="../assets/productPictures/${Object.keys(cart)[x]}.jpg" alt="alexa">
      <div>
        <h1 class="cart-name">${Object.keys(cart)[x]}</h1><br>
        <h3 class="cart-disc">${products[Object.keys(cart)[x]]["description"]}</h3><br>
        <h3 class="cart-price">${products[Object.keys(cart)[x]]["price"]}₹</h3>
      </div>
    </div>`

    grid.appendChild(cartItem)
}