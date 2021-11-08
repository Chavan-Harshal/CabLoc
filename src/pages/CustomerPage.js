import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerLogin from "./CustomerLogin";
import "./CustomerPage.css";
import Axios from "axios";

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      location: [],
      trips: [],
    };
  }

  //   async componentDidMount() {
  //     await Axios({
  //       method: "get",
  //       url: "#",
  //     })
  //       .then(async (res) => {
  //         console.log(res);
  //         let lookup = {};
  //         await res.data.location.map((val, k) => {
  //           lookup[val.zipcode] = val.loc_name;
  //         });
  //         console.log(lookup);
  //         this.setState({
  //           location: lookup,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //     await Axios({
  //       method: "post",
  //       url: "#",
  //       data: {
  //         user_id: this.props.user_id,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({
  //           trips: res.data.data,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }

  render() {
    return (
      <div className="CustomerPage">
        <AppNavbar />
        <div className="Customer">
          <div class="jumbotron">
            <img
              alt="avatar"
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            />
            <h1 class="display-4">Hello World</h1>
            <p className="lead">
              CabLoc lets you book a trip and see nearby taxis
            </p>
            <hr class="w-100" />
            <p>Try booking a trip now</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerPage;
