import { ProductCard } from "../components/ProductCard.js";
import { getProducts } from "../utils/api.js";

export async function HomePage() {
    const products = await getProducts();
    return `
    <div class="product-list">
      ${products.map(p => ProductCard(p)).join("")}
    </div>
  `;
}
