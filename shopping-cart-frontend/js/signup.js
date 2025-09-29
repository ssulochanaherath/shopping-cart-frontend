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
            Swal.fire({
                icon: 'success',
                title: 'Account Created!',
                text: 'Your account was created successfully.',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: data.message || 'Something went wrong!',
            });
        }
    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Error connecting to server',
        });
    }
});
