import React from "react";

function Register() {
  return (
    <div className="register-page">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
