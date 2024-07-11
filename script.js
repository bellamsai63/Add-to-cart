document.addEventListener("DOMContentLoaded", () => {
        const AddtoCartBtn = document.querySelectorAll(".add-to-cart-btn")
        console.log(AddtoCartBtn)

        // accessing all button for adding the function for all add-to-cart button
        AddtoCartBtn.forEach((ele) => {
            console.log(ele);

            // adding clicking functionality to each buton
            ele.addEventListener('click', (e) => {
                console.log(e.target);

                // accessing the product informtion through the navigation
                const ProductInfo = ele.parentElement.parentElement
                console.log(ProductInfo);

                // accessing the information  like  tittle, price, img
                const ProductTittle = ProductInfo.querySelector(".product-title").innerText
                const ProductPrice = ProductInfo.querySelector(".product-price").innerText
                const ProductImage = ProductInfo.querySelector(".product-img").src
                console.log(ProductImage);
                console.log(ProductTittle);
                console.log(ProductPrice);

                // creating a single object for selected items to store in cart
                const SelectedProducts = {
                        name: ProductTittle,
                        price: ProductPrice,
                        img: ProductImage
                    }
                    // console.log(SelectedProducts);

                //passing the selected products into adda to cart  function as a value
                AddtoCart(SelectedProducts)
            })
        })
    })
    // To store the selected items 
let CartItems = []
console.log(CartItems);
// 2. function to add items into cart
function AddtoCart(products) {
    console.log(products)

    // checking for existing items in the cart
    const ExistingItems = CartItems.find((item) => item.name === products.name)

    if (ExistingItems) {

        // increasing the quantity for item that is already there in cart
        ExistingItems.quantity++
    } else {
        // if items not found in cart the single item with  quantity one will bepushed in cart
        CartItems.push({...products, quantity: 1 })
    }

    // calling the updateCart UI to print the data in ui
    UpdateCartUI()
} // function to update cart ui
function UpdateCartUI() {

    // accessing the ul list to print the selected cart items into i
    const CartItemEle = document.querySelector(".cart_items")
    CartItemEle.innerHTML = ""

    // accessing the array to print the items selected
    CartItems.forEach((item) => {
        console.log(item)

        // creating li item and appending dynamically into cart
        const CartProd = document.createElement("li")
        CartProd.innerHTML = `<div class="product">
        <img src=${item.img} class="product-img" />
        <div class="product-info">
            <h4 class="product-title">${item.name}</h4>
            <p class="product-price">${item.price}</p>
            <span class="Quantity">${item.quantity}</span>
            <div class="quantity-container">
                <button class="increase-quantity">+</button>
                <span class="Quantity">${item.quantity}</span>
                <button class="decrease-quantity">-</button>
            </div>
            <button class="remove-quantity">remove</button>
        </div>
    </div>`

        // console.log(CartProd);

        // adding the functionality for increase and decrease buttons
        const CartProductEle = CartProd.querySelector(".quantity-container") //increase and decrease button values
        const CartProductVal = CartProductEle.querySelector(".Quantity") //value of no. of similar items or products
        const IncreaseQuantity = CartProductEle.querySelector(".increase-quantity")
        const DecreaseQuantity = CartProductEle.querySelector(".decrease-quantity")
        const RemoveQuantity = CartProd.querySelector(".remove-quantity") //remove button


        // adding functionality increase, decrease and remove buttons through addEventListeners
        IncreaseQuantity.addEventListener("click", () => {
            HandleIncQuantity(item, CartProductVal)
        })
        DecreaseQuantity.addEventListener("click", () => {
            HandleDecQuantity(item, CartProductVal)
        })
        RemoveQuantity.addEventListener("click", () => {
            HandleRemQuantity(item)
        })

        // appending the cart product(li items) Element to ul list
        CartItemEle.appendChild(CartProd)
    })
    CartIconTotal()
}

// 4. function to handle increase quantity
function HandleIncQuantity(item, CartProductVal) {
    item.quantity++
        CartProductVal.innerText = item.quantity
        //function to update the ui of the cart
    UpdateCartUI()
    CartTotal()
}



// 5. function to handle decress quantity
function HandleDecQuantity(item, CartProductVal) {
    if (item.quantity > 1) {
        item.quantity++
            CartProductVal.innerText = item.quantity
            //function to update the ui of the cart
        UpdateCartUI()
        CartTotal()
    }
}



// 6. function to handle delete items 
function HandleRemQuantity(products) {
    let index = CartItems.findIndex((prod) => { item.name == prod.name })
    if (index != -1) {
        if (CartItems[index] > 1) {
            CartItems[index].quantity-- // used for removing only one item at a time
        } else {
            CartItems.splice(index, 1) //if only one eleement is found it removes entire item
        }
    }
    UpdateCartUI()
    CartIconTotal()
    CartTotal()
}

// 7. function to handle total price of items
function CartTotal() {
    //for calculating totalprice for the quantity element
    const CartTotalEle = document.querySelector("#cart-total")
    const TotalVal = CartItems.reduce((total, current) => total + current.price * current.quantity, 0)
    CartTotalEle.innerText = `total:${TotalVal.toFixed(2)}`
}
// 8. function to handle remove All items in the cart 



// 9.  function to update the cart icon value
function CartIconTotal() {
    //for calculating totalprice for the quantity element
    const CartIconEle = document.querySelector("#cart-item-count")
    const TotalVal = CartItems.reduce((total, current) => total + current.quantity, 0)
    CartIconEle.innerText = TotalVal
}