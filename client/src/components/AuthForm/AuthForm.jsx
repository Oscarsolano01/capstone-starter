import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const AuthForm = ({ authAction, mode = "login" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      await authAction({ username, password }, mode);
    } catch (ex) {
      setError(ex.error);
    }
  };
  return (
    <SignInContainer>
      <Card>
        <form onSubmit={submit}>
          {!!error && <div className="error">{error}</div>}
          {/* {mode === "register" && (
        <input
          value={username}
          placeholder="username"
          onChange={(ev) => setUsername(ev.target.value)}
        />
      )} */}

          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              id="username"
              type="username"
              name="username"
              placeholder="Username"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "username" }}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </FormControl>

          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              onChange={(ev) => setPassword(ev.target.value)}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {mode}
          </Button>
        </form>
      </Card>
    </SignInContainer>
  );
};

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 40dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default AuthForm;
