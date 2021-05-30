import React from "react";
import "./loading.css"

function Cartloading(props) {
  return (
          <div className="spinner-grow text-danger loading" role="status">
            <span className="sr-only"></span>
          </div>
  );
}

export default Cartloading;
