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
                <td>
                    <i class="fas fa-edit edit-btn" title="Edit" data-id="${product.id}" style="cursor:pointer; margin-right:10px; color:blue;"></i>
                    <i class="fas fa-trash delete-btn" title="Delete" data-id="${product.id}" style="cursor:pointer; color:red;"></i>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach delete handlers
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                if (confirm("Are you sure you want to delete this product?")) {
                    await deleteProduct(id);
                }
            });
        });

        // Attach edit handlers
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                await editProduct(id);
            });
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

// Delete product
async function deleteProduct(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            alert("Product deleted!");
            loadProducts();
        } else {
            alert("Failed to delete product");
        }
    } catch (err) {
        console.error("Error deleting product:", err);
    }
}

// Edit product
async function editProduct(id) {
    try {
        // Get product details from backend
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const product = await res.json();

        if (!res.ok) {
            alert("Product not found!");
            return;
        }

        // Fill form with existing data
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("category").value = product.category;

        // Change Add button behavior to Update
        const btn = document.getElementById("add-product-btn");
        btn.textContent = "Update Product";
        btn.onclick = async () => {
            const name = document.getElementById("name").value.trim();
            const price = parseFloat(document.getElementById("price").value);
            const category = document.getElementById("category").value.trim();
            const imageFile = document.getElementById("image").files[0];

            let imageData = product.image;
            if (imageFile) {
                imageData = await toBase64(imageFile);
            }

            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, price, category, image: imageData })
                });

                if (res.ok) {
                    alert("Product updated!");
                    loadProducts();
                    btn.textContent = "Add Product";
                    btn.onclick = null;
                    document.getElementById("name").value = "";
                    document.getElementById("price").value = "";
                    document.getElementById("category").value = "";
                    document.getElementById("image").value = "";
                } else {
                    alert("Failed to update product");
                }
            } catch (err) {
                console.error("Error updating product:", err);
            }
        };
    } catch (err) {
        console.error("Error editing product:", err);
    }
}

loadProducts();
