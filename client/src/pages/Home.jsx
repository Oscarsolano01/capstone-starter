import AuthForm from "../components/AuthForm/AuthForm";

const Home = ({ auth, authAction, logout, businesses, users }) => {
  return (
    <div>
      <div className="home-page">
        <div className="home-overlay"></div>
        <div className="home-title-container">
          <h1 className="home-title">Welcome to Windy City Reviews</h1>
          <p className="home-subtitle">
            Discover and review the best businesses around you
          </p>
        </div>
      </div>

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
