import React, { Component } from "react";
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from "reactstrap";
import logo from "../logo.png";
import "./Appnavbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import { About } from "../pages/About";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
      role: "",
    };
  }
  handleRedirect = () => {
    this.setState({ redirectHome: true });
  };

  logout = () => {
    localStorage.clear();
    this.setState({ redirectHome: true });
  };
  home = () => {
    let role = localStorage.getItem("role");
    console.log(role);
    this.setState({
      role: role,
    });
  };

  render() {
    if (this.state.redirectHome === true) {
      return <Redirect to="/" push></Redirect>;
    } else if (this.state.role == "admin") {
      return <Redirect to="/AdminPage" push></Redirect>;
    } else if (this.state.role == "driver") {
      return <Redirect to="/DriverPage" push></Redirect>;
    } else if (this.state.role == "customer") {
      return <Redirect to="/CustomerPage" push></Redirect>;
    } else {
      //   localStorage.clear();
      //   return <Redirect to="/" push></Redirect>;
    }
    return (
      <div className="Navbar">
        <Navbar>
          <NavbarBrand className="Brand">
            <img onClick={this.handleRedirect} src={logo} alt="LOGO" />
            <b onClick={this.handleRedirect}>CABLOC</b>
            <link
              href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
              rel="stylesheet"
            />
            <span>Grab a Cab !</span>
          </NavbarBrand>
          <Nav className="ms-auto">
            <NavItem>
              <NavLink onClick={this.home}>
                <span>Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.about}>
                <Link to="/AboutUs" style={{ textDecoration: "none" }}>
                  <span>About Us</span>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logout}>
                <span>Logout</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
