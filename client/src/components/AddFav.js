import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

function AddFav(props) {
  return (
    <>
      {props.favList.indexOf(props.font) === -1 ? (
        <AddCircleIcon style={{ fill: "#ff5252" }} />
      ) : (
        <RemoveCircleOutlineIcon style={{ fill: "#ff5252" }} />
      )}
    </>
  );
}

export default AddFav;
