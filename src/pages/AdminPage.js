import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import "./AdminPage.css";
import Axios from "axios";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { BACKEND_URL } from "../config";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      rating: "",
      taxiNo: "",
      color: "",
      model: "",
      class: "",
      capacity: "",
      garage: [],
    };
  }
  getGarage = () => {
    Axios({
      method: "get",
      url: BACKEND_URL + "/admin/getgarage",
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          garage: res.data.garage,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  setPhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  setRating = (e) => {
    this.setState({
      rating: e.target.value,
    });
  };
  setTaxiNo = (e) => {
    this.setState({
      taxiNo: e.target.value,
    });
  };
  setColor = (e) => {
    this.setState({
      color: e.target.value,
    });
  };
  setModel = (e) => {
    this.setState({
      model: e.target.value,
    });
  };
  setClass = (e) => {
    this.setState({
      class: e.target.value,
    });
  };
  setCapacity = (e) => {
    this.setState({
      capacity: e.target.value,
    });
  };

  addDriver = async () => {
    const driverId = Math.floor(Math.random() * 100000).toString();
    const taxiId = "tx" + Math.floor(Math.random() * 100000).toString();
    const data = {
      driver_id: driverId,
      taxi_id: taxiId,
      d_name: this.state.name,
      d_phone_no: this.state.phone,
      rating: this.state.rating,
      number: this.state.taxiNo,
      color: this.state.color,
      class: this.state.class,
      model: this.state.model,
      capacity: this.state.capacity,
    };
    await Axios({
      method: "post",
      url: BACKEND_URL + "/admin/adddriver",
      data: data,
    })
      .then((res) => {
        console.log(res);
        store.addNotification({
          title: "Added Successfully",
          message: "Driver details updated",
          type: "success",
          container: "bottom-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
      })
      .catch((e) => {
        console.log(e);
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
      });
  };

  render() {
    return (
      <div className="AdminPage">
        <AppNavbar />
        <ReactNotification />
        <div className="Admin">
          <div class="jumbotron">
            <img
              alt="car"
              src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
            />
            <h1>Welcome Admin</h1>
            <button
              type="button"
              class="btn btn-outline-dark"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Add Driver
            </button>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={this.getGarage}
              data-bs-toggle="modal"
              data-bs-target="#mymodal1"
            >
              Garage Info
            </button>
          </div>
        </div>
        <div id="myModal" class="modal fade" role="dialog" tabIndex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Driver Registration</h4>
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
                    onChange={this.setName}
                  />
                  <label>Mobile No</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter mobile no"
                    onChange={this.setPhone}
                  />
                  <label>Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter driver rating"
                    onChange={this.setRating}
                  />
                  <label>Taxi No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter taxi number"
                    onChange={this.setTaxiNo}
                  />
                  <label>Taxi color</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter taxi color"
                    onChange={this.setColor}
                  />
                  <label>Taxi model</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter taxi model"
                    onChange={this.setModel}
                  />
                  <label>Taxi class</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter taxi class"
                    onChange={this.setClass}
                  />
                  <label>Taxi capacity</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter taxi capacity"
                    onChange={this.setCapacity}
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
                  onClick={() => {
                    this.addDriver();
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="mymodal1" class="modal fade" role="dialog" tabIndex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Garage Status</h4>
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
                      <th scope="col">Garage ID</th>
                      <th scope="col">Taxi Number</th>
                      <th scope="col">Taxi Color</th>
                      <th scope="col">Taxi Status</th>
                    </tr>
                  </thead>
                  {this.state.garage.map((val, k) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{val.garage_id}</td>
                          <td>{val.number}</td>
                          <td>{val.color}</td>
                          <td className="status">
                            {val.status === "1" ? (
                              <h6>Ready</h6>
                            ) : (
                              <h6>Needs maintenance</h6>
                            )}
                          </td>
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
    );
  }
}

export default AdminPage;
