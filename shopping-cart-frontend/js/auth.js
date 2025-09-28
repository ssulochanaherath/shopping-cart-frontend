document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        // Save login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        // Redirect to home page
        window.location.href = "index.html";
    } else {
        alert("Please enter email and password");
    }
});
