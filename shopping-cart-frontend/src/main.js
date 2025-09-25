// main.js
import { Navbar } from "./components/Navbar.js";
import { HomePage } from "./pages/Home.js";
import { LoginPage, attachLoginListener } from "./pages/Login.js";
import { SignupPage } from "./pages/Signup.js";
import { CheckoutPage } from "./pages/Checkout.js";
import { CartPage } from "./components/Cart.js";

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

async function render() {
    const page = window.location.hash || "#/login";
    let content = "";

    if (page === "#/login") {
        document.getElementById("navbar").innerHTML = "";
        content = LoginPage();
    } else if (page === "#/signup") {
        document.getElementById("navbar").innerHTML = "";
        content = SignupPage();
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

    if (page === "#/login") attachLoginListener();
}

window.render = render;

// ---- Signup logic ---- //
window.handleSignup = function (e) {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account created! You can now log in.");
    window.location.hash = "#/login";
};
