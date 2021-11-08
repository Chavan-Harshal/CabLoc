import React, { Component } from "react";
import ReactNotification from "react-notifications-component";
import AppNavbar from "../components/AppNavbar";
import "./CustomerLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      name: "",
      pass: "",
    };
  }
  register = () => {
    this.setState({ register: true });
  };

  handlename = (e) => {
    this.setState({ name: e.target.value });
  };

  handlepass = (e) => {
    this.setState({ pass: e.target.value });
  };

  login = () => {
    if (this.state.name === "nikitatipule" && this.state.pass === "nikita26") {
      this.props.history.push("/AdminPage");
    }
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
                <h1>Admin Login</h1>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={this.handlename}
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={this.handlepass}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  onClick={this.login}
                >
                  Log in
                </button>
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

export default AdminLogin;
