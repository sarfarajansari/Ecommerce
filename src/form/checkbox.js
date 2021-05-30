import React from "react"
function checkbox(){
    return(
        <div class="input-group mb-3">
          <div class="input-group-text">
            <input
              class="form-check-input mt-0"
              id="checkbox"
              type="checkbox"
              aria-label="Checkbox for following text input"
            />
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with checkbox"
          />
        </div>
      );
}


export default checkbox