import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";

//DARK MODE IMPLEMENTATION
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import { GlobalStyles } from "../global";

import AuthContext from "../context/auth/authContext";

import FontContext from "../context/fonts/fontContext";

function TopMenu(props) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  const fontContext = useContext(FontContext);

  useEffect(() => {
    loadUser();
    fontContext.getFavs();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    props.resetFavs();
    fontContext.clearFavs();
  };

  const MenuButton = styled.button`
  color: ${props.isDark ? "#FAFAFA" : "#363537"}
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none !important;
    padding: 0.25em 1em;
    border: 0px solid transparent;
    background-color: transparent;
    cursor: pointer;
  `;

  const LinkButton = styled(Link)`
  color: ${props.isDark ? "#FAFAFA" : "#363537"}
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none !important;
    padding: 0.25em 1em;
    border: 0px solid transparent;
    background-color: transparent;
    cursor: pointer;
  `;

  const authLinks = (
    <Fragment>
      <MenuButton style={{ pointerEvents: "none" }}>
        HELLO {user && user.name.toUpperCase()}
      </MenuButton>
      <MenuButton onClick={onLogout} href="#!">
        <span>LOGOUT</span>
      </MenuButton>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Tooltip title="Register To Save Your Favourites" aria-label="register">
        <MenuButton>
          <LinkButton to="/register">REGISTER</LinkButton>
        </MenuButton>
      </Tooltip>
      <MenuButton>
        <LinkButton to="/login">LOGIN</LinkButton>
      </MenuButton>
    </Fragment>
  );

  return (
    <ThemeProvider theme={props.isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <div
          style={{
            backgroundColor: "transparent",
            borderBottom: props.isDark
              ? "1px solid rgba(255,255,255,0.4)"
              : "1px solid rgba(0,0,0,0.14)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
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
          <div>
            <>{isAuthenticated ? authLinks : guestLinks}</>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default TopMenu;
