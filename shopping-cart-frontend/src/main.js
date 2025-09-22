import { Navbar } from "./components/Navbar.js";
import { HomePage } from "./pages/Home.js";
import { LoginPage } from "./pages/Login.js";
import { CheckoutPage } from "./pages/Checkout.js";
import { CartPage } from "./components/Cart.js";

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

async function render() {
    document.getElementById("navbar").innerHTML = Navbar();

    let page = window.location.hash || "#/";
    let content = "";

    if (page === "/") {
        content = await HomePage();
    } else if (page === "#/cart") {
        content = CartPage();
    } else if (page === "#/login") {
        content = LoginPage();
    } else if (page === "#/checkout") {
        content = CheckoutPage();
    }

    document.getElementById("app").innerHTML = content;
}

window.render = render; // make render available globally
