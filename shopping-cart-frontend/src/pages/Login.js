export function LoginPage() {
    return `
    <div style="padding:20px;">
      <h2>Login</h2>
      <button onclick="fakeLogin()">Login</button>
      <button>Login with Google</button>
      <button>Login with Facebook</button>
      <button>Login with Passkey</button>
    </div>
  `;
}
