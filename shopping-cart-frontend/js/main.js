// Sample categories and products
const categories = [
    { id: 1, name: 'Vegetables' },
    { id: 2, name: 'Fruits' },
    { id: 3, name: 'Cakes' },
    { id: 4, name: 'Biscuits' }
];

const products = [
    { id: 1, name: 'Tomato', price: 2.5, category: 1, description: 'Fresh tomato', imageUrl: 'images/vegetables/tomato.jpg' },
    { id: 2, name: 'Apple', price: 3.0, category: 2, description: 'Red apple', imageUrl: 'images/fruits/apple.jpg' },
    { id: 3, name: 'Chocolate Cake', price: 10, category: 3, description: 'Delicious cake', imageUrl: 'images/cakes/chocolate.jpg' },
];

const categoriesDiv = document.getElementById('categories');
categoriesDiv.innerHTML = categories.map(cat => `<button class="category-btn">${cat.name}</button>`).join('');

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

function addToCart(productId) {
    alert('Added product ID ' + productId + ' to cart (frontend only)');
}
