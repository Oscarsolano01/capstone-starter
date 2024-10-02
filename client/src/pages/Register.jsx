import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
const Register = ({ authAuction, auth }) => {
  return (
    <div className="register-page">
      <h2>Register</h2>
      {!auth.id ? (
        <>
          <AuthForm authAction={authAuction} mode="register" />
        </>
      ) : null}
    </div>
  );
};

export default Register;
