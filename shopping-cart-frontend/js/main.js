async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/api/products");
        const productsFromDB = await res.json();

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

        const products = productsFromDB.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: categoriesMap[p.category],
            description: p.description || "",
            imageUrl: p.image || "placeholder.jpg"
        }));

        const categoriesDiv = document.getElementById('categories');
        categoriesDiv.innerHTML = categories.map(cat => `<button class="category-btn" onclick="filterProducts(${cat.id})">${cat.name}</button>`).join('');

        renderProducts(products);

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

async function addToCart(productId) {
    const userId = localStorage.getItem("userId") || 1; // demo user
    await fetch(`http://localhost:5000/api/cart/${userId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });
    alert("Product added to cart!");
}

loadProducts();
