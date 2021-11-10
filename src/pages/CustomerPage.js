import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerPage.css";
import Axios from "axios";
import UserLocation from "../components/Usertrip";

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      location: [],
      trips: [],
    };
  }

// async componentDidMount() {
//   await Axios({
//     method: "get",
//     url: "#",
//   })
//     .then(async (res) => {
//       console.log(res);
//       let lookup = {};
//       await res.data.location.map((val, k) => {
//         lookup[val.zipcode] = val.loc_name;
//       });
//       console.log(lookup);
//       this.setState({
//         location: lookup,
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
//   await Axios({
//     method: "post",
//     url: "#",
//     data: {
//       user_id: this.props.user_id,
//     },
//   })
//     .then((res) => {
//       console.log(res);
//       this.setState({
//         trips: res.data.data,
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }

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
            <h1>Hello User</h1>
            
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
                            <th scope='col'>Sr No</th>
                            <th scope='col'>From</th>
                            <th scope='col'>To</th>
                            <th scope='col'>Fare</th>
                          </tr>
                        </thead>
                        {this.state.trips.map((val, k) => {
                          return (
                            <tbody>
                              <tr>
                                <td>{k+1}</td>
                                <td>{this.state.location[val.from_s.toString()]}</td>
                                <td>{this.state.location[val.to_d.toString()]}</td>
                                <td>{val.fare}</td>
                              </tr>
                            </tbody>
                          )
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
