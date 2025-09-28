// Fetch products from backend and build categories and products arrays dynamically
async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/api/products");
        const productsFromDB = await res.json();

        // Build unique categories array
        const categoriesMap = {};
        productsFromDB.forEach(p => {
            if (p.category && !categoriesMap[p.category]) {
                categoriesMap[p.category] = Object.keys(categoriesMap).length + 1;
            }
        });

        const categories = Object.keys(categoriesMap).map(catName => ({
            id: categoriesMap[catName],
            name: catName
        }));

        // Build products array in same format as your sample
        const products = productsFromDB.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: categoriesMap[p.category],
            description: p.description || "",
            imageUrl: p.image || "placeholder.jpg"
        }));

        // Render categories
        const categoriesDiv = document.getElementById('categories');
        categoriesDiv.innerHTML = categories.map(cat => `<button class="category-btn" onclick="filterProducts(${cat.id})">${cat.name}</button>`).join('');

        // Render products
        renderProducts(products);

        // Store products globally for filtering
        window.allProducts = products;

    } catch (err) {
        console.error("Error loading products:", err);
    }
}

// Render products helper
function renderProducts(products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.imageUrl}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join('');
}

// Filter products by category
function filterProducts(categoryId) {
    const filtered = window.allProducts.filter(p => p.category === categoryId);
    renderProducts(filtered);
}

// Add to cart (frontend only)
function addToCart(productId) {
    alert('Added product ID ' + productId + ' to cart (frontend only)');
}

// Load products on page load
loadProducts();
