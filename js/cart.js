// Define getCartItems globally
function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        return [];
    }
}

// Define changeValue function globally
function changeValue(button, operation, productId) {
    let input = document.getElementById(`numberInput-${productId}`);
    let currentValue = parseInt(input.value);
    
    if (operation === '+' && currentValue < 9) {
        input.value = currentValue + 1;
    } else if (operation === '-' && currentValue > 1) { // Allow decrement to 0
        input.value = currentValue - 1;
    }

    updateTotal(); // Update total amount after changing quantity
}

// Function to update the total amount based on cart items
function updateTotal() {
    const cartItems = getCartItems();
    let totalAmount = 0;

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => cartItems.includes(product.id.toString()));

            filteredProducts.forEach(product => {
                const input = document.getElementById(`numberInput-${product.id}`);
                if (input) {
                    const quantity = parseInt(input.value);
                    totalAmount += quantity * product.price;
                }
            });

            const totalAmountElement = document.getElementById('totalAmount');
            if (totalAmountElement) {
                totalAmountElement.innerText = totalAmount.toFixed(2);
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    function updateCartCount() {
        let cart = getCartItems();
        let cartCount = cart.length; // Count the number of items in the cart

        // Update the cart-count element in the navbar
        const cartCountElement = document.getElementById('cart-count');
        
        if (cartCountElement) {
            cartCountElement.innerText = cartCount;
        }

        // Update the cart count in other places if necessary
        const cartCountElements = document.querySelectorAll('.cart-count');
        if (cartCountElements) {
            cartCountElements.forEach(element => {
                element.innerText = cartCount;
            });
        }

        // Update the cart count element with ID cartCount
        const newCartCountElement = document.getElementById('cartCount');
        if (newCartCountElement) {
            newCartCountElement.innerText = cartCount;
        }
    }

    function displayCartItems() {
        const cartItems = getCartItems();
        const cartItemsContainer = document.getElementById('cartItems');
        const totalAmountElement = document.getElementById('totalAmount');

        if (!cartItemsContainer || !totalAmountElement) {
            return;
        }

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center py-5">Your cart is empty.</p>';
            totalAmountElement.innerText = '0.00';
            updateCartCount(); // Ensure cart count is updated here
            return;
        }

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product => cartItems.includes(product.id.toString()));
                let totalAmount = 0;
                cartItemsContainer.innerHTML = '';

                filteredProducts.forEach(product => {
                    const productQuantityId = `numberInput-${product.id}`;
                    const productQuantityValue = localStorage.getItem(productQuantityId) || 1;

                    cartItemsContainer.innerHTML += `
                        <div class="row main align-items-center" data-product-id="${product.id}">
                            <div class="col-2"><img class="img-fluid" src="${product.image}" alt="${product.title}"></div>
                            <div class="col">
                                <div class="row text-muted">${product.title.substring(0, 31)}</div>
                            </div>
                            <div class="col d-flex row-cols-md-4 justify-content-center align-items-center px-0">
                                <button class="btn col me-2 fw-bold" onclick="changeValue(this, '-', '${product.id}')">-</button>
                                <input class=" col mb-0 me-2 shadow-none text-center rounded" type="text" id="${productQuantityId}" value="${productQuantityValue}" readonly>
                                <button class="btn col fw-bold" onclick="changeValue(this, '+', '${product.id}')">+</button>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                <div class="cartPrice " id="productPrice-${product.id}">$ ${product.price}</div>
                                <div class="deletItem px-4"><button class="btn-remove-from-cart px-3" data-product-id="${product.id}"><i class="bi bi-cart-dash"></i></button></div>
                            </div>
                        </div>
                    `;

                    totalAmount += product.price * productQuantityValue;
                });

                totalAmountElement.innerText = totalAmount.toFixed(2);
                updateCartCount();

                document.querySelectorAll('.btn-remove-from-cart').forEach(button => {
                    button.addEventListener('click', function() {
                        const productId = button.getAttribute('data-product-id');
                        removeFromCart(productId);
                    });
                });
            });
    }

    function addToCart(productId) {
        let cart = getCartItems();
        if (!cart.includes(productId)) {
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartCount();
    }

    function removeFromCart(productId) {
        let cart = getCartItems();
        const index = cart.indexOf(productId);
        if (index > -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }

    // Initialize the cart count and display items on page load
    updateCartCount();
    displayCartItems();
});



// function clearCart() {
//     localStorage.removeItem('cart');
// }