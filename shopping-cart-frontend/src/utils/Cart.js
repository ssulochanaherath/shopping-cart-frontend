export let cart = [];

export function addToCart(productId) {
    const products = [
        { id: 1, name: "Apple", price: 1.2 },
        { id: 2, name: "Banana", price: 0.8 },
        { id: 3, name: "Cake", price: 5.0 }
    ];

    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    render(); // refresh UI
}

export function removeFromCart(index) {
    cart.splice(index, 1);
    render();
}

export function updateCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// render() is declared in main.js, but cart functions will call it
