import AuthForm from "../components/AuthForm/AuthForm";

const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Take a look at the {businesses.length} Businesses we have reviewed
        <br />
        Display some interesting information about our {users.length} Users
        <br />
        Display some interesting information about our {reviews.length} Reviews
      </p>
      {!auth.id ? (
        <>
          <AuthForm authAction={authAction} mode="login" />
          <AuthForm authAction={authAction} mode="register" />
        </>
      ) : null}
    </div>
  );
};

export default Home;
