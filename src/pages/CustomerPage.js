import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerPage.css";
import Axios from "axios";
import UserLocation from "../components/Usertrip";
import { BACKEND_URL } from "../config";

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("userId"),
      user_name: localStorage.getItem("userName"),
      location: {},
      trips: [],
    };
  }

  async componentDidMount() {
    await Axios({
      method: "get",
      url: BACKEND_URL + "/customer/getlocnames",
    })
      .then(async (res) => {
        console.log(res.data.data);
        const loc = {};
        for (let i = 0; i < res.data.data.length; i++) {
          loc[res.data.data[i].zipcode] = res.data.data[i].loc_name;
        }
        this.setState({
          location: loc,
        });
      })
      .catch((e) => {
        console.log("error here");
        console.log(e);
      });
    await Axios({
      method: "post",
      url: BACKEND_URL + "/customer/gettrips",
      data: {
        user_id: localStorage.getItem("userId"),
      },
    })
      .then((res) => {
        // console.log(res);
        console.log("hekldsjf");
        this.setState({
          trips: res.data.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(this.state.location);
  }

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
            <h1>Hello {this.state.user_name}</h1>

            <hr class="w-100" />
            <p>Try booking a trip now</p>
            <UserLocation data={this.props.user_id} />
            <hr class="w-100" />
            <button
              type="button"
              class="btn btn-outline-dark"
              data-bs-toggle="modal"
              data-bs-target="#mymodal1"
            >
              My Trips
            </button>
          </div>
          <div>
            <div id="mymodal1" class="modal fade" role="dialog" tabIndex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">My Trips</h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sr No</th>
                          <th scope="col">From</th>
                          <th scope="col">To</th>
                          <th scope="col">Fare</th>
                        </tr>
                      </thead>
                      {this.state.trips.map((val, k) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{k + 1}</td>
                              <td>{this.state.location[val.from_s]}</td>
                              <td>{this.state.location[val.to_d]}</td>
                              <td>{val.fare}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerPage;
