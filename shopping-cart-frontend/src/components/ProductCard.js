export function ProductCard(product) {
    return `
    <div class="product">
      <img src="${product.image}" alt="${product.name}" width="150" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}
