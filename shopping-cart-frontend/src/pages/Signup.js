export function SignupPage() {
    return `
    <div class="auth-container">
      <h2>Sign Up</h2>
      <form onsubmit="handleSignup(event)">
        <input type="text" id="signup-username" placeholder="Username" required />
        <input type="password" id="signup-password" placeholder="Password" required />
        <input type="password" id="signup-confirm" placeholder="Confirm Password" required />
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <a href="#/login">Login</a></p>
    </div>
  `;
}
