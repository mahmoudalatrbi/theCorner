const dropdownBtn = document.getElementById('dropdownBtn');
const dropdown = document.getElementById('dropdown');
dropdownBtn.addEventListener("click", () => {
    dropdown.classList.toggle("open");
    dropdown.classList.toggle("py-2");
    dropdown.classList.toggle("index");
  
  });

document.addEventListener("DOMContentLoaded", function () {
    const Products = document.getElementById("Products");

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const idsToDelete = [9, 10, 11, 12, 13, 14];
            const filteredProducts = products.filter(product => !idsToDelete.includes(product.id));
            Products.innerHTML = '';
            filteredProducts.forEach(product => {
                Products.innerHTML += `
                    <div class="col mb-5">
                        <div class="card text-light">
                            <img class="card-img-top" src="${product.image}" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fs-5 fw-bold">${product.title.substring(0, 20)}</h5>
                                    <p class="fs-6 fw-bold">Price: ${product.price} $</p>
                                </div>
                            </div>
                            <div class="card-footer row row-cols-md-2 p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center col mb-3 px-4">
                                    <button class="btn-details btn btn-outline-light ml-3 m-auto" data-product-id="${product.id}">View</button>
                                </div>
                                <div class="text-center col px-3">
                                    
                                    <button class="btn-add-to-cart btn btn-outline-light" data-product-id="${product.id}"><i class="bi bi-cart-plus-fill"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.querySelectorAll('.btn-details').forEach(button => {
                button.addEventListener('click', function () {
                    const productId = button.getAttribute('data-product-id');
                    window.location.href = `product.html?id=${productId}`;
                });
            });

            document.querySelectorAll('.btn-add-to-cart').forEach(button => {
                button.addEventListener('click', function () {
                    const productId = button.getAttribute('data-product-id');
                    addToCart(productId);
                });
            });

            document.querySelectorAll('.btn-remove-from-cart').forEach(button => {
                button.addEventListener('click', function () {
                    const productId = button.getAttribute('data-product-id');
                    removeFromCart(productId);
                });
            });
        });

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.indexOf(productId);
        if (index > -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const cartCountElement1 = document.getElementById('cart-count');
        if (cartCountElement1) {
            cartCountElement1.textContent = cart.length;
        }

        const cartCountElement2 = document.getElementById('cartCount');
        if (cartCountElement2) {
            cartCountElement2.textContent = cart.length;
        }
    }

    // Initialize the cart count on page load
    updateCartCount();

    const container3 = document.getElementById("container3");
    if (container3) {
        const registerBtn = document.getElementById("register");
        const loginBtn = document.getElementById("login");

        registerBtn.addEventListener("click", () => {
            container3.classList.add("active");
        });

        loginBtn.addEventListener("click", () => {
            container3.classList.remove("active");
        });
    }
   
    
});

