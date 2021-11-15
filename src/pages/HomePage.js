import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./HomePage.css";
import AppNavbar from "../components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

class HomePage extends Component {
  customer = () => {
    this.props.history.push("/CustomerLogin");
  };
  driver = () => {
    this.props.history.push("/DriverLogin");
  };
  admin = () => {
    this.props.history.push("/AdminLogin");
  };
  render() {
    return (
      <div>
        <AppNavbar />
        <div className="bg-light">
          <div className="input">
            <h1 className="header">
              BOOK A TAXI TO YOUR
              <br /> DESTINATION
            </h1>
            <br />
            {/* <span>Log in</span> */}
            <button class="btn btn-outline-dark" onClick={this.customer}>
              Customer
            </button>
            <button class="btn btn-outline-dark" onClick={this.driver}>
              Driver
            </button>
            <button class="btn btn-outline-dark" onClick={this.admin}>
              Admin
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
