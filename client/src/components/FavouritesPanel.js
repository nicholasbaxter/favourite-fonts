import React, { useState, useEffect } from "react";

function FavouritesPanel(props) {
  const [cssFavs, setCssFavs] = useState("");
  const [panelShowing, setPanelShowing] = useState(false);
  const handleClick = () => {
    setPanelShowing(!panelShowing);
  };

  useEffect(() => {
    let arr = [];
    props.favList.map(item => {
      arr.push(item.replace(/\s+/g, "+"));
    });
    setCssFavs(arr.join("|"));
  }, [props.favList]);

  return (
    <div
      style={{
        backgroundColor: panelShowing ? "rgba(0,0,0,0.3)" : "transparent",
        pointerEvents: "none",
        position: "fixed",
        bottom: "0px",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div
        className={panelShowing ? "fav-panel open" : "fav-panel"}
        style={{
          opacity: props.favList.length > 0 ? "1" : "0",
          position: "fixed",
          bottom: "0px",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Roboto",
          pointerEvents: "auto"
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            height: "600px",
            position: "fixed",
            bottom: "0px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            zIndex: "15"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "40px",
              top: "0px",
              backgroundColor: "black",
              color: "white",
              padding: "0 10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: "115"
            }}
          >
            <p style={{ fontFamily: "Roboto", fontSize: "14px" }}>
              {props.favList.length}{" "}
              {props.favList.length > 1 ? "Families" : "Family"} selected
            </p>
            <button
              onClick={handleClick}
              style={{
                textDecoration: "none",
                border: "0px solid transparent",
                padding: "0 3px 7px 0",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "28px",
                cursor: "pointer"
              }}
            >
              _
            </button>
          </div>
          <div
            style={{ padding: "17px", fontFamily: "Roboto", fontSize: "14px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontFamily: "Roboto",
                fontSize: "14px"
              }}
            >
              <p>Your Selection</p>{" "}
              <p
                style={{
                  fontSize: "13px",
                  color: "#FF5252",
                  paddingLeft: "20px",
                  visibility: "hidden"
                }}
              >
                Clear All
              </p>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              {props.favList.map((item, i) => (
                <span key={i}>
                  <div
                    style={{
                      maxWidth: "100%",
                      backgroundColor: "#EEEEEE",
                      borderRadius: "16px",
                      padding: "0 8px 0 8px",
                      margin: "0 8px 8px 0",
                      alignSelf: "center",
                      height: "32px",
                      lineHeight: "32px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {item}
                  </div>
                </span>
              ))}
            </div>
            <p>
              <br />
              <b>Embed Font</b>
            </p>
            <br />
            <p>
              To embed your selected fonts into a webpage, copy this code into
              the &lt;head&gt; of your HTML document.
            </p>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              <p
                style={{
                  color: "#FF5252",
                  paddingRight: "16px",
                  marginRight: "4px"
                }}
              >
                STANDARD
              </p>
              <p
                style={{
                  color: "#FF5252",
                  paddingRight: "16px",
                  marginRight: "4px",
                  visibility: "hidden"
                }}
              >
                @IMPORT
              </p>
            </div>
            <br />
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.08)",
                maxWidth: "100%",
                wordWrap: "break-word",
                overflowWrap: "break-word"
              }}
            >
              <p
                style={{
                  fontFamily: "Roboto Mono",
                  fontSize: "12px",
                  padding: "10px"
                }}
              >
                &lt;link href="https://fonts.googleapis.com/css?family=
                <b>{cssFavs}</b>
                &display=swap" rel="stylesheet"&gt;
              </p>
            </div>

            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.08)",
                margin: "20px 0 20px 0",
                height: "2px"
              }}
            ></div>

            <p>Specify in CSS </p>
            <br />
            <p> Use the following CSS rules to specify these families:</p>
            <br />
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.08)",
                maxWidth: "100%",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                padding: "10px"
              }}
            >
              {props.favList.length > 0
                ? props.favList.map((item, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "Roboto Mono",
                        fontSize: "12px"
                      }}
                    >
                      font-family: '{item}';
                    </p>
                  ))
                : ""}
            </div>
            <br />
            <p>
              For examples of how fonts can be added to webpages, do a
              'favourite' search.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavouritesPanel;
