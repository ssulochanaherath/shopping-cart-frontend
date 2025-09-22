import { cart, updateCartTotal } from "../utils/cart.js";

export function CartPage() {
    if (cart.length === 0) {
        return `<p>Your cart is empty.</p>`;
    }

    return `
    <div id="cart-page">
      <h2>Your Cart</h2>
      ${cart.map((item, i) => `
        <div class="cart-item">
          <span>${item.name} (x${item.quantity})</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart(${i})">Remove</button>
        </div>
      `).join("")}
      <div class="total">Total: $${updateCartTotal().toFixed(2)}</div>
      <a href="#/checkout"><button>Proceed to Checkout</button></a>
    </div>
  `;
}
