import React, { Component } from "react";
import ReactNotification, { store } from "react-notifications-component";
import AppNavbar from "../components/AppNavbar";
import "./CustomerLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

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
      localStorage.setItem("role", "admin");
      // this.props.history.push("/AdminPage");
      this.setState({
        login: true,
      });
    } else {
      store.addNotification({
        title: "Error",
        message: "Try again",
        type: "danger",
        container: "bottom-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    }
  };

  render() {
    if (this.state.login) {
      return <Redirect to="/AdminPage"></Redirect>;
    }
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
