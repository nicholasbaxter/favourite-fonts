import React from "react";
import "../App.css";
import styled from "styled-components";
import AddFav from "./AddFav";
import LazyLoad from "react-lazyload";
//DARK MODE IMPLEMENTATION
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import { GlobalStyles } from "../global";

// import FontContext from "../context/fonts/fontContext";
// import AuthContext from "../context/auth/authContext";

function FontView(props) {
  // const authContext = useContext(AuthContext);
  // const fontContext = useContext(FontContext);
  // const { isAuthenticated, logout, user, loadUser } = authContext;

  //make array of sentences -- index of JSON data % index of word array in order to assign different ones
  const placeholder =
    "Though the gravity still dragged at him, his muscles were making great efforts to adjust. After the daily classes he no longer collapsed immediately into bed. Only the nightmares got worse.";

  const CardPreviewText = styled.p`
    font-size: ${props => (props.size ? props.size : "32px")};
    font-family: ${props => props.family}, Arial, Sans-Serif;
    word-break: break-word;

    @font-face {
      font-family: ${props => props.family};
      src: url(${props => props.url});
    }
  `;

  // const tagUpdate = () => {
  //   console.log("!!!");
  // };

  return (
    <ThemeProvider theme={props.isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />

        <div style={{ padding: "0 20px 0 20px" }}>
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "12px",
              paddingBottom: "10px"
            }}
          >
            Viewing {props.fontNumber} of {props.fontTotal} font families
          </p>
          <div
            style={{
              display: props.isList ? "flex" : "grid",
              gridTemplateColumns: props.isList
                ? "none"
                : "repeat(auto-fill, minmax(280px, 1fr))",
              gridGap: props.isList ? "none" : "30px",
              flexDirection: "column"
            }}
          >
            {props.fontData
              ? props.fontData.map((item, i) => {
                  return (
                    <LazyLoad height={50} key={i}>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          borderTop: "1px solid"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "2.1rem"
                          }}
                        >
                          <h6>{item.family}</h6>
                          <button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              props.handleFavList(item.family);
                            }}
                          >
                            <AddFav
                              font={item.family}
                              favList={props.favList}
                            />
                          </button>
                        </div>
                        <>
                          <CardPreviewText
                            size={props.fontSize}
                            family={item.family}
                            url={item.files.regular}
                            type={item.category}
                          >
                            {props.typeInput !== ""
                              ? props.typeInput
                              : placeholder}
                          </CardPreviewText>
                        </>
                      </div>
                    </LazyLoad>
                  );
                })
              : ""}
          </div>
        </div>

        <div style={{ paddingBottom: "150px" }}></div>
      </>
    </ThemeProvider>
  );
}

export default FontView;
