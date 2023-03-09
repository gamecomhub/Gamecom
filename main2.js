let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "GamingChair",
        tag: "gamingchair",
        price: 4550,
        inCart: 0
    },  
    {
        name: "BlueKeyboard",
        tag: "bluekeyboard",
        price: 2500,
        inCart: 0
    },
    {
        name: "VRHeadset",
        tag: "vrheadset",
        price: 10500,
        inCart: 0
    },
    {
        name: "GamesTshirt",
        tag: "valoshirt",
        price: 1050,
        inCart: 0
    },
    {
        "name": "MerchCup",
        "tag": "cup",
        "price": 550,
        "inCart": 0
    },
    {
        name: "VRHeadset2nd",
        tag: "vrheadset2",
        price: 5500,
        inCart: 0
    }
    
];
console.log(carts.length);
for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}


function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart).toLocaleString();

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product px-2">
                <ion-icon name="close-circle"></ion-icon>
                <img class="sm-hide" src="./assets/images/${item.tag}.jpg" />
                <span >${item.name}</span>
            </div>
            <div class="price sm-hide px-2">₱${item.price}.00</div>
            <div class="quantity px-2   ">
                <ion-icon class="decrease" name="remove-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="add-circle-outline"></ion-icon>   
            </div>
            <div class="total px-2">₱${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer my-2">
                <h5 class="basketTotalTitle">Subtotal Total</h5>` + `
                <h5 class="basketTotal"><u>₱${cart}.00</u></h5>
            </div>`

    

        deleteButtons();
        manageQuantity();
    }
}




function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct] && cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
                //window.location.reload()
            }
        });

            increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if (cartItems[currentProduct] !== undefined) {
                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct]);
                totalCost(cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
              }
              
            //window.location.reload()
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
            //window.location.reload()
        })
    }
}

onLoadCartNumbers();
displayCart();
