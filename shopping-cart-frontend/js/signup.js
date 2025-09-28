document.getElementById("signup-btn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            alert("Account created successfully!");
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
});
