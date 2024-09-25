import AuthForm from "../components/AuthForm/AuthForm";

function Login({ auth, authAction }) {
  return (
    <>
      <AuthForm authAction={authAction} mode="login" />;
    </>
  );
}

export default Login;
