async function loadCart() {
    const userId = localStorage.getItem("userId") || 1; // demo user
    const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
    const items = await res.json();

    const tbody = document.querySelector("#cart-table tbody");
    tbody.innerHTML = "";

    let total = 0;
    items.forEach(item => {
        const subtotal = item.Product.price * item.quantity;
        total += subtotal;
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${item.Product.name}</td>
      <td>$${item.Product.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" 
          onchange="updateQuantity(${item.ProductId}, this.value)">
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td>
        <button onclick="removeFromCart(${item.ProductId})">❌</button>
      </td>
    `;
        tbody.appendChild(tr);
    });

    document.getElementById("cart-total").textContent = "Total: $" + total.toFixed(2);
}

async function updateQuantity(productId, quantity) {
    const userId = localStorage.getItem("userId") || 1;
    await fetch(`http://localhost:5000/api/cart/${userId}/update/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: parseInt(quantity) })
    });
    loadCart();
}

async function removeFromCart(productId) {
    const userId = localStorage.getItem("userId") || 1;
    await fetch(`http://localhost:5000/api/cart/${userId}/remove/${productId}`, {
        method: "DELETE"
    });
    loadCart();
}

loadCart();
