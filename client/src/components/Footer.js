import React from "react";

function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        height: "30px",
        backgroundColor: "rgb(255, 82, 82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <p
        style={{ fontFamily: "Roboto Mono", fontSize: "12px", color: "white" }}
      >
        Made by EyeCandyCode 2019
      </p>
    </div>
  );
}

export default Footer;
