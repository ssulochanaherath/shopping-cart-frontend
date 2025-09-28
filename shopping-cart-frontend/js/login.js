document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successful!");
            localStorage.setItem("userEmail", data.user.email);
            localStorage.setItem("token", data.token);
            window.location.href = "index.html"; // redirect to home
        } else {
            alert(data.message || "Invalid credentials");
        }
    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});
