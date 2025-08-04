// Define getCartItems globally
function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        return [];
    }
}

// Define addToCart function globally
function addToCart(productId) {
    let cart = getCartItems();
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
    let cart = getCartItems();
    let cartCount = cart.length;

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
}

document.addEventListener("DOMContentLoaded", function () {
    const productDetailsDiv = document.getElementById('product-details');

    // Get product ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Make a request to the API endpoint for product details
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Populate product details on the page
            productDetailsDiv.innerHTML = `
                <div class="container px-4 px-lg-5 my-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center align-items-center">
                        <div class="col-md-4 myimage"><img class="card-img-top mb-5 mb-md-0" src="${product.image}" alt="..." /></div>
                        <div class="col-md-6">
                            <div class="small mb-1">SKU: BST-498</div>
                            <h1 class="display-5 fw-bolder">${product.title}</h1>
                            <div class="fs-5 mb-3">
                                <span>${product.price} $</span>
                            </div>
                            <p class="lead">${product.description.substring(0, 499)}.</p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-outline-dark flex-shrink-0" data-product-id="${product.id}" onclick="addToCart('${product.id}')">
                                    <i class="bi bi-cart-plus-fill"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching product:', error);
        });
});
