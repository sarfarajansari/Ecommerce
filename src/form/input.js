import React from "react"

class Input extends React.Component {
    render() {
      return (
        <div class="input-group mb-3">
          <span class="input-group-text w-50" id="inputGroup-sizing-default">
            {this.props.label}
          </span>
          <input
            type={this.props.type}
            value={this.props.value}
            onChange={this.props.onChange}
            id={this.props.id}
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
      );
    }
  }

export default Input