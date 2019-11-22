import React from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import IconButton from "@material-ui/core/IconButton";
//Icons
import SearchIcon from "@material-ui/icons/Search";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import ViewListIcon from "@material-ui/icons/ViewList";
import RefreshIcon from "@material-ui/icons/Refresh";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
//
import customStyles from "./SelectCustomStyles";
import Tooltip from "@material-ui/core/Tooltip";
//DARK MODE IMPLEMENTATION
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import { GlobalStyles } from "../global";

function SearchBar(props) {
  const handleSearchChange = e => {
    props.handleSearchInput(e.target.value);
  };
  const handleTypeChange = e => {
    props.handleTypeInput(e.target.value);
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 670 });
    return isMobile ? children : null;
  };

  return (
    <ThemeProvider theme={props.isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <div
          style={{
            display: "flex",
            height: "46px",
            flexDirection: "row",
            justifyContent: "space-between",
            left: "0",
            margin: "0 auto",
            maxWidth: "1440px",
            overflow: "visible",
            position: "relative",
            right: "0",
            border: "1px solid #dadce0",
            borderRadius: "48px",
            width: "90%"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            <SearchIcon style={{ margin: "0 0.7rem 0 0.7rem" }} />

            <input
              type="text"
              style={{
                color: props.isDark ? "#FAFAFA" : "#363537",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                fontFamily: "Roboto",
                fontWeight: "bold"
              }}
              value={props.fontSearch}
              onChange={e => handleSearchChange(e)}
              placeholder="Search fonts"
            />
          </div>
          <Mobile>
            <input
              type="text"
              style={{
                color: props.isDark ? "#FAFAFA" : "#363537",
                borderTop: "none",
                borderBottom: "none",
                borderRight: "1px solid #dadce0",
                borderLeft: "1px solid #dadce0",
                padding: "0 17px 0 17px",
                background: "transparent",
                fontSize: "14px",
                fontFamily: "Roboto",
                fontWeight: "bold"
              }}
              value={props.typeInput}
              onChange={e => handleTypeChange(e)}
              placeholder="Type something"
            />
            <div
              style={{
                width: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Select
                styles={customStyles}
                placeholder={"24px"}
                options={options}
                onChange={e => props.handleFontSize(e.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Tooltip title="Toggle Dark Mode" aria-label="toggle dark mode">
                <IconButton
                  size="small"
                  style={{ height: "30px", margin: "0 0.7rem 0 0.7rem" }}
                  onClick={e => props.toggleDark(e)}
                >
                  {props.isDark ? (
                    <InvertColorsIcon style={{ fill: "#FAFAFA" }} />
                  ) : (
                    <InvertColorsIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle List View" aria-label="toggle list view">
                <IconButton
                  size="small"
                  style={{ height: "30px" }}
                  onClick={e => props.toggleList(e)}
                >
                  {props.isDark ? (
                    props.isList ? (
                      <ViewComfyIcon style={{ fill: "#FAFAFA" }} />
                    ) : (
                      <ViewListIcon style={{ fill: "#FAFAFA" }} />
                    )
                  ) : props.isList ? (
                    <ViewComfyIcon />
                  ) : (
                    <ViewListIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset" aria-label="reset">
                <IconButton
                  size="small"
                  style={{ height: "30px", margin: "0 0.7rem 0 0.7rem" }}
                  onClick={e => props.reset(e)}
                >
                  {props.isDark ? (
                    <RefreshIcon style={{ fill: "#FAFAFA" }} />
                  ) : (
                    <RefreshIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </Mobile>
        </div>
      </>
    </ThemeProvider>
  );
}

export default SearchBar;

const options = [
  { value: "20", label: "20px" },
  { value: "24", label: "24px" },
  { value: "32", label: "32px" },
  { value: "40", label: "40px" }
];
