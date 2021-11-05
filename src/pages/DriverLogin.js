import React, { Component } from "react";
import ReactNotification, { store } from "react-notifications-component";
import AppNavbar from "../components/AppNavbar";
import "./CustomerLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";

class DriverLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }
  register = () => {
    this.setState({ register: true });
  };

  render() {
    return (
      <div>
        <AppNavbar></AppNavbar>
        <ReactNotification />
        <div></div>
        <div className="CustomerLogin">
          {!this.state.login ? (
            <div>
              <form className="login">
                <h1>Driver Login</h1>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <button class="btn btn-outline-light">Log in</button>
              </form>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default DriverLogin;
