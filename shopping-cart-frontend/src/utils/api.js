// Later this will fetch from backend
export async function getProducts() {
    return [
        { id: 1, name: "Apple", price: 1.2, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Banana", price: 0.8, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Cake", price: 5.0, image: "https://via.placeholder.com/150" }
    ];
}
