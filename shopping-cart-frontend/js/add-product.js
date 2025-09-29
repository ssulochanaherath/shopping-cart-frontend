function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// ========== Load all products ==========
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

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to delete this product?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                });
                if (result.isConfirmed) {
                    await deleteProduct(id);
                }
            });
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                await editProduct(id);
            });
        });

    } catch (err) {
        console.error("Error loading products:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load products'
        });
    }
}

// ========== Add product ==========
async function addProductHandler() {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();
    const imageFile = document.getElementById("image").files[0];

    if (!name || !price || !category) {
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Data',
            text: 'Please fill all required fields!'
        });
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
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: 'Product added successfully!',
                timer: 1500,
                showConfirmButton: false
            });
            loadProducts();
            resetForm();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: data.message || "Failed to add product"
            });
        }
    } catch (err) {
        console.error("Error adding product:", err);
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Could not add product'
        });
    }
}

// ========== Delete product ==========
async function deleteProduct(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Product deleted successfully',
                timer: 1200,
                showConfirmButton: false
            });
            loadProducts();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to delete product'
            });
        }
    } catch (err) {
        console.error("Error deleting product:", err);
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Could not delete product'
        });
    }
}

// ========== Edit / Update product ==========
async function editProduct(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const product = await res.json();

        if (!res.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Product not found!'
            });
            return;
        }

        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("category").value = product.category;

        const preview = document.getElementById("image-preview");
        preview.innerHTML = product.image ? `<img src="${product.image}" width="80" style="margin-top:5px;">` : "";

        const btn = document.getElementById("add-product-btn");
        btn.textContent = "Update Product";

        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener("click", async () => {
            const name = document.getElementById("name").value.trim();
            const price = parseFloat(document.getElementById("price").value);
            const category = document.getElementById("category").value.trim();
            const imageFile = document.getElementById("image").files[0];

            let imageData = product.image; // keep old if not changed
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
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Product updated successfully',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    loadProducts();
                    resetForm();

                    newBtn.textContent = "Add Product";
                    const resetBtn = newBtn.cloneNode(true);
                    newBtn.parentNode.replaceChild(resetBtn, newBtn);
                    resetBtn.addEventListener("click", addProductHandler);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Failed to update product'
                    });
                }
            } catch (err) {
                console.error("Error updating product:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Could not update product'
                });
            }
        });
    } catch (err) {
        console.error("Error editing product:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not fetch product'
        });
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("image").value = "";
    document.getElementById("image-preview").innerHTML = "";
}

document.getElementById("add-product-btn").addEventListener("click", addProductHandler);

loadProducts();
