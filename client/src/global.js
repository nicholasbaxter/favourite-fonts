import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    outline:none; text-decoration:none;
  }

  body {
    
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }
  
  .fav-panel {
    transform: translate(0, 530px);
    /* background-color: transparent; */
    transition-timing-function: ease-in-out;
    transition: background-color 0.4s, transform 1.1s ease-in-out;
  }
  .fav-panel.open {
    transform: translate(0, 0);
    /* background-color: rgba(0, 0, 0, 0.3); */
    /* transition: background-color 2s, transform 2s; */
  }
  
  .hide-mobile {
    @media (max-width: 460px) {
      display: none;
      borderRight: "none",
    }
  }
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
  `;
