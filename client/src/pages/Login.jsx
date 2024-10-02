import AuthForm from "../components/AuthForm/AuthForm";

const Login = ({ auth, authAction }) => {
  return (
    <>
      <AuthForm authAction={authAction} mode="login" />
    </>
  );
};

export default Login;
