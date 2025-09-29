document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please enter email and password',
        });
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 1500
            });

            localStorage.setItem("userEmail", data.user.email);
            localStorage.setItem("token", data.token);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.message || 'Invalid credentials',
            });
        }
    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Please try again later',
        });
    }
});

// Optional: Show SweetAlert2 notifications for social login buttons
document.getElementById("google-login").addEventListener("click", () => {
    Swal.fire({
        icon: 'info',
        title: 'Coming Soon',
        text: 'Google login integration is not ready yet.'
    });
});

document.getElementById("facebook-login").addEventListener("click", () => {
    Swal.fire({
        icon: 'info',
        title: 'Coming Soon',
        text: 'Facebook login integration is not ready yet.'
    });
});

document.getElementById("passkey-login").addEventListener("click", () => {
    Swal.fire({
        icon: 'info',
        title: 'Coming Soon',
        text: 'Passkey login integration is not ready yet.'
    });
});
