import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleBusiness from "./pages/SingleBusiness";
import NavBar from "./components/AuthForm/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

function App({ businessData = [] }) {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/businesses`);

        if (!response.ok) {
          throw new Error("Failed to fetch businesses");
        }
        const data = await response.json();
        console.log(data);
        setBusinesses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users`);

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/reviews`);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log(data);
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>Windy City Reviews</h1>
      <NavBar businesses={businesses} auth={auth} users={users} />
      {auth.id && <button onClick={logout}>Logout {auth.username}</button>}
      <Routes>
        <Route
          path="*"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
            />
          }
        />

        <Route
          path="/login"
          element={<Login authAction={authAction} auth={auth} />}
        />
        <Route
          path="/register"
          element={<Register authAuction={authAction} auth={auth} />}
        />
        {/* <Route
          path="/reviews"
          element={
            <Reviews reviews={reviews} authAction={authAction} auth={auth} />
          }
        /> */}
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} />}
        />
        <Route path="/business/:id" element={<SingleBusiness />} />
        <Route path="/users" element={<Users users={users} />} />
        {!!auth.id && (
          <Route
            path="/createReview"
            element={
              <CreateReview
                businesses={businesses}
                reviews={reviews}
                auth={auth}
              />
            }
          />
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
