import Input from "./input"
import checkbox from "./checkbox"
import get_button from "./button"
import React from "react"


class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        number: "",
        email: "",
        password: "",
        Checkbox: false,
      };
    }
    render() {
      return (
        <div class="col-lg-6 Form ">
          <div class="row justify-content-center">
            <h1 class="text-center">React Form</h1>
            <Input type="text" id="name" label="Full Name" />
            <Input type="number" id="number" label="Phone Number" />
            <Input type="email" id="email" label="email" />
            <Input type="password" id="password" label="password" />
            {checkbox()}
            {get_button("primary", "submit", this.submitform)}
          </div>
        </div>
      );
    }

    submitform = (event) => {
      this.setState({
        name: document.getElementById("name").value,
        number: document.getElementById("number").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        Checkbox: document.getElementById("checkbox").checked,
      });
      setInterval(this.printstate, 3000);
    };
    printstate = () => {
      console.log(this.state);
    };

    //create form action
  }

export default Form