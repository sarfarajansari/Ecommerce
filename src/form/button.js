import React from "react"

function get_button(color, value, func) {
    var classname = "btn w-50 btn-" + color;
    return (
      <button type="button" onClick={func} class={classname}>
        {value}
      </button>
    );
  }

  export default get_button