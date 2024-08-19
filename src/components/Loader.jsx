import React from "react";
import "./css/Loader.css";

const Loader = ({ run }) => {
  return (
    <div className={`${run ? "" : "hidden"}`}>
      <div className="loader">
        <div className="box-load1"></div>
        <div className="box-load2"></div>
        <div className="box-load3"></div>
      </div>
    </div>
  );
};

export default Loader;
