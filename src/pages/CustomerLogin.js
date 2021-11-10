import React, { Component } from "react";
import ReactNotification, { store } from "react-notifications-component";
import AppNavbar from "../components/AppNavbar";
import "./CustomerLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Redirect } from "react-router";

class CustomerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      name: "",
      pass: "",
      phno: "",
      add: "",
      register: false,
    };
  }
  register = () => {
    // this.setState({ register: true });
    const data = {
      name: this.state.name,
      pass: this.state.pass,
      ph: this.state.phno,
      add: this.state.add,
    };
    console.log(data);
    axios.post(BACKEND_URL + "/api/register", data).then((res) => {
      console.log(res);
    });
  };

  login = () => {
    const data = {
      name: this.state.name,
      pass: this.state.pass,
    };
    console.log(data);
    localStorage.clear();
    axios.post(BACKEND_URL + "/api/login", data).then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        localStorage.setItem("userId", this.state.pass);
        localStorage.setItem("userName", this.state.name);
        this.props.history.push("/CustomerPage");
      }
    });
    console.log(localStorage);
  };

  handlename = (e) => {
    this.setState({ name: e.target.value });
  };

  handlepass = (e) => {
    this.setState({ pass: e.target.value });
  };

  handleadd = (e) => {
    this.setState({ add: e.target.value });
  };

  handleph = (e) => {
    this.setState({ phno: e.target.value });
  };

  loginname = (e) => {
    this.setState({ name: e.target.value });
  };

  loginpass = (e) => {
    this.setState({ pass: e.target.value });
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
                <h1>Customer Login</h1>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={this.loginname}
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={this.loginpass}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  onClick={this.login}
                >
                  Log in
                </button>
                <span>Not Registered yet ?</span>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  Register Now
                </button>
              </form>
              <div id="myModal" class="modal fade" role="dialog" tabIndex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Register to CABLOC</h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form className="register">
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
                        <label>Mobile No</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter mobile no"
                          onChange={this.handleph}
                        />
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter address"
                          onChange={this.handleadd}
                        />
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        data-bs-dismiss="modal"
                        onClick={this.register}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default CustomerLogin;
