import { Navbar } from "./components/Navbar.js";
import { HomePage } from "./pages/Home.js";
import { LoginPage } from "./pages/Login.js";
import { CheckoutPage } from "./pages/Checkout.js";
import { CartPage } from "./components/Cart.js";

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

async function render() {
    let page = window.location.hash || "#/login";
    let content = "";

    if (page === "#/login") {
        document.getElementById("navbar").innerHTML = "";
        content = LoginPage();
    } else if (page === "#/") {
        document.getElementById("navbar").innerHTML = Navbar();
        content = await HomePage();
    } else if (page === "#/cart") {
        document.getElementById("navbar").innerHTML = Navbar();
        content = CartPage();
    } else if (page === "#/checkout") {
        document.getElementById("navbar").innerHTML = Navbar();
        content = CheckoutPage();
    }

    document.getElementById("app").innerHTML = content;
}

window.fakeLogin = function () {
    localStorage.setItem("isLoggedIn", "true");
    window.location.hash = "#/";
};

window.render = render;
