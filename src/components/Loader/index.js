import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles.css";

function Loader({ color }) {
  return (
    <div className="loader-container">
      <CircularProgress color={color} />
    </div>
  );
}

export default Loader;
