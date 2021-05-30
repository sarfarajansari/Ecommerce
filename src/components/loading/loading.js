import React from "react";
import "./loading.css"

function Loading() {
  return (
      <div className="spinner-border loading text-danger" role="status">
        <span className="sr-only"></span>
      </div>
  );
}

export default Loading;
