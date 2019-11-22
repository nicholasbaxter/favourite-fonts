import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
//MUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useAlert } from "react-alert";

const Register = props => {
  const alert = useAlert();
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      alert.show("User already exists");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert.show("Please fill in all fields");
    } else if (password !== password2) {
      alert.show("Passwords do not match");
    } else {
      register({
        name,
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
      <div style={{ margin: "0", padding: "0" }}>
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
              Sign Up
            </Typography>
            <h1>Account Registration</h1>

            <form className={classes.form} onSubmit={onSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                type="name"
                htmlFor="name"
                value={name}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
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
                type="password"
                htmlFor="password"
                value={password}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm password"
                id="password"
                type="password"
                htmlFor="password2"
                value={password2}
                onChange={onChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;
