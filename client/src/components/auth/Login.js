import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useAlert } from "react-alert";

const Login = props => {
  const alert = useAlert();
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      alert.show("Invalid Credentials");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert.show("Please fill in all fields");
    } else {
      login({
        email,
        password
      });
    }
  };

  const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(0,0,0,0.14)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px"
          }}
        >
          <Link
            to="/"
            style={{
              color: props.isDark ? "#FAFAFA" : "#363537",
              fontFamily: "Roboto Mono",
              fontSize: "22px",
              paddingLeft: "1rem",
              textDecoration: "none"
            }}
          >
            Favourite Fonts
          </Link>
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <h1>Account Login</h1>

            <form className={classes.form} onSubmit={onSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                htmlFor="email"
                value={email}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type="password"
                htmlFor="password"
                value={password}
                onChange={onChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
