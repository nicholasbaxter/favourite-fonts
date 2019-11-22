import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
//Pages
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//Components
import TopMenu from "./components/TopMenu";
import SearchBar from "./components/SearchBar";
import FontView from "./components/FontView";
import FavouritesPanel from "./components/FavouritesPanel";
import Footer from "./components/Footer";
//DARK MODE IMPLEMENTATION
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
//Auth
import AuthContext from "./context/auth/authContext";
import setAuthToken from "./utils/setAuthToken";
//Fonts
import FontContext from "./context/fonts/fontContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [fontData, setFontData] = useState(null);
  const [fontSearch, setFontSearch] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [fontSize, setFontSize] = useState("24px");
  const [isDark, setIsDark] = useState(false);
  const [isList, setIsList] = useState(false);

  const [fontNumber, setFontNumber] = useState(null);
  const [fontTotal, setFontTotal] = useState(null);

  const [favList, setFavList] = useState([]);

  const authContext = useContext(AuthContext);
  const fontContext = useContext(FontContext);
  let {
    favs,
    addFav,
    deleteFav,
    getFavs
    // loading
  } = fontContext;

  useEffect(() => {
    getFavs();

    // THIS IS THE REAL CALL
    async function fetchFonts() {
      const res = await fetch(`/fonts`);
      const json = await res.json();
      // console.log(json.items);
      setFontNumber(json.items.length);
      setFontTotal(json.items.length);
      setFontData(json.items);
    }
    fetchFonts();

    //TEST WITH HARD CODED FONT OBJECT
    // async function fetchFonts() {
    //   const res = await fetch(`/fonts/test`);
    //   const json = await res.json();
    //   setFontNumber(json.length);
    //   setFontTotal(json.length);
    //   setFontData(json);
    // }
    // fetchFonts();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let arr = [];
    if (favs) {
      Object.keys(favs).map((item, i) => {
        arr.push(favs[item].name);
      });
      setFavList(arr);
    }
  }, [favs]);

  //TEST (One for dummy API call)
  // const handleSearchInput = async e => {
  //   setFontSearch(e);
  //   const res = await fetch(`/fonts/search?q=${e}`);
  //   const json = await res.json();
  //   setFontNumber(json.length);
  //   setFontData(json);
  // };

  const handleSearchInput = async e => {
    setFontSearch(e);
    const res = await fetch(`/fonts/search?q=${e}`);
    const json = await res.json();
    setFontNumber(json.length);
    setFontData(json);
  };
  const handleTypeInput = e => {
    setTypeInput(e);
  };
  const handleFontSize = e => {
    setFontSize(`${e}px`);
  };
  const toggleDark = () => {
    setIsDark(!isDark);
  };
  const toggleList = () => {
    setIsList(!isList);
  };
  const reset = e => {
    setFontSize("24px");
    setFontSearch("");
    setTypeInput("");
    setIsDark(false);
    setIsList(false);
  };

  const resetFavs = () => {
    setFavList([]);
  };

  const handleFavList = e => {
    //if favList includes font clicked
    if (favList.includes(e)) {
      const index = favList.indexOf(e);
      const list = [...favList];
      list.splice(index, 1);
      setFavList([...list]);
      //if logged in
      if (authContext.user && favs) {
        Object.keys(favs).map((item, i) => {
          if (favs[item].name === e) {
            deleteFav(favs[item]._id);
          }
        });
      }
    }
    // else if favList does not include font clicked
    else {
      //if (logged in)
      if (authContext.user) {
        addFav({ name: e });
      }
      //
      setFavList([...favList, e]);
    }
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <>
            <GlobalStyles />
            <TopMenu isDark={isDark} resetFavs={resetFavs} />
            <br />
            <SearchBar
              fontSearch={fontSearch}
              handleSearchInput={handleSearchInput}
              typeInput={typeInput}
              handleTypeInput={handleTypeInput}
              handleFontSize={handleFontSize}
              toggleDark={toggleDark}
              isDark={isDark}
              toggleList={toggleList}
              isList={isList}
              reset={reset}
            />
            <br />
            <FontView
              fontSearch={fontSearch}
              typeInput={typeInput}
              fontSize={fontSize}
              isDark={isDark}
              isList={isList}
              fontData={fontData}
              fontNumber={fontNumber}
              fontTotal={fontTotal}
              handleFavList={handleFavList}
              favList={favList}
            />
            <ScrollUpButton style={{ zIndex: "100" }} />
            <div style={{ display: "flex" }}>
              <FavouritesPanel favList={favList} />
              <Footer style={{ zIndex: "20" }} />
            </div>
          </>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
