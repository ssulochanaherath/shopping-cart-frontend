export function LoginPage() {
    return `
    <div style="max-width:400px; margin:50px auto; padding:30px; border:1px solid #ddd; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1); font-family:sans-serif;">
      <h2 style="text-align:center; margin-bottom:20px;">Login</h2>

      <form id="login-form">
        <div style="margin-bottom:15px;">
          <label for="login-username" style="display:block; margin-bottom:5px;">Username or Email</label>
          <input type="text" id="login-username" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;" required>
        </div>

        <div style="margin-bottom:20px;">
          <label for="login-password" style="display:block; margin-bottom:5px;">Password</label>
          <input type="password" id="login-password" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;" required>
        </div>

        <button type="submit" style="width:100%; padding:12px; background-color:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">Login</button>
      </form>

      <p style="text-align:center; margin:15px 0;">or login with</p>

      <div style="display:flex; justify-content:space-between;">
        <button style="flex:1; margin-right:5px; padding:10px; background-color:#db4437; color:white; border:none; border-radius:4px; cursor:pointer;">Google</button>
        <button style="flex:1; margin-left:5px; padding:10px; background-color:#3b5998; color:white; border:none; border-radius:4px; cursor:pointer;">Facebook</button>
      </div>

      <p style="text-align:center; margin-top:20px;">
        Don't have an account? <a href="#/signup">Create Account</a>
      </p>
    </div>
  `;
}

export function attachLoginListener() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        console.log("Logging in:", username, password);

        // Simple fake login, navigate to home
        localStorage.setItem("isLoggedIn", "true");
        window.location.hash = "#/";
    });
}
