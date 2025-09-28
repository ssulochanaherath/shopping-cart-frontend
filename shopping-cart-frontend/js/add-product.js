// Convert image file to base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Load all products
async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/api/products");
        const products = await res.json();

        const tbody = document.querySelector("#products-table tbody");
        tbody.innerHTML = "";

        products.forEach(product => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${product.name}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.category}</td>
        <td>${product.image ? `<img src="${product.image}" width="50">` : ""}</td>
      `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

// Add new product
document.getElementById("add-product-btn").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();
    const imageFile = document.getElementById("image").files[0];

    if (!name || !price || !category) {
        alert("Please fill all required fields!");
        return;
    }

    let imageData = "";
    if (imageFile) {
        imageData = await toBase64(imageFile);
    }

    try {
        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, category, image: imageData })
        });

        const data = await res.json();
        if (res.ok) {
            alert("Product added successfully!");
            loadProducts();
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("category").value = "";
            document.getElementById("image").value = "";
        } else {
            alert(data.message || "Failed to add product");
        }
    } catch (err) {
        console.error("Error adding product:", err);
        alert("Server error");
    }
});

// Load on page start
loadProducts();
