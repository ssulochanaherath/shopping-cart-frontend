import { cart, updateCartTotal } from "../utils/Cart.js";

export function CheckoutPage() {
    return `
    <div style="padding:20px;">
      <h2>Order Summary</h2>
      <ul>
        ${cart.map(item => `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join("")}
      </ul>
      <p class="total">Total: $${updateCartTotal().toFixed(2)}</p>
      <p><em>Payment integration will come later.</em></p>
    </div>
  `;
}
