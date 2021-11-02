import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./HomePage.css";
import AppNavbar from "../components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

class HomePage extends Component {
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
            <span>Log in</span>
            <a href="/CustomerLogin" class="btn btn-outline-dark">
              Customer
            </a>
            <a href="/DriverLogin" class="btn btn-outline-dark">
              Driver
            </a>
            <a href="/AdminLogin" class="btn btn-outline-dark">
              Admin
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
