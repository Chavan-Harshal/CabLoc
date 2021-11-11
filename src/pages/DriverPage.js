import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import axios from "axios";
import { StarRating } from "baseui/rating";
import "./DriverPage.css";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Location from "../components/locationChhooser";

class DriverPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d_name: "",
      // pass: "",
      driver_id: "",
      d_phone_no: "",
      taxi_id: "",
      rating: "",
      myloc: "",
      code: "",
      taxi: {},
      shifts: "",
      tripDetails: "",
      request: false,
      c: "",
      user: "",
      modal: false,
      detail: false,
      fare: "",
      duration: "",
    };
  }
  getloc = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/driver/mylocation",
      data: {
        driver_id: localStorage.getItem("driverId"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          myloc: res.data.data[0].loc_name,
          code: res.data.data[0].zipcode,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  componentDidMount = async () => {
    await axios({
      method: "post",
      url: "http://localhost:5000/driver/getme",
      data: {
        driver_id: localStorage.getItem("driverId"),
      },
    }).then((res) => {
      console.log(res.data.data);
      console.log("hello");
      this.setState({
        //driver_id: res.data.data[0].driver_id,
        d_name: res.data.data[0].d_name,
        d_phone_no: res.data.data[0].d_phone_no,
        taxi_id: res.data.data[0].taxi_id,
        rating: res.data.data[0].rating,
      });
    });

    await axios;
    await axios({
      method: "post",
      url: "http://localhost:5000/driver/gettaxi",
      data: {
        driver_id: localStorage.getItem("driverId"),
      },
    })
      .then(async (res) => {
        console.log(res);
        console.log(res.data.data[0].driver_id);
        let a = {};
        //         color: "black"
        // driver_id: "88874"
        // model: "sedan"
        // number: 1000
        // taxi_id: "tx97170"
        a["color"] = res.data.data[0].color;
        a["driver_id"] = res.data.data[0].driver_id;
        a["model"] = res.data.data[0].modal;
        a["number"] = res.data.data[0].number;
        a["taxi_id"] = res.data.data[0].taxi_id;
        console.log(a);
        await this.setState({
          taxi: a,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    await axios({
      method: "post",
      url: "http://localhost:5000/driver/getshift",
      data: {
        driver_id: localStorage.getItem("driverId"),
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        shifts: res.data.shifts,
      });
    });
    console.log(this.state.taxi);
    await this.getloc();
  };

  decline = (trip_id) => {
    axios({
      method: "post",
      url: "http://localhost:5000/driver/decline",
      data: {
        trip_id: trip_id,
      },
    })
      .then((res) => {
        console.log(res);
        this.modalOpen();
        store.addNotification({
          title: "Ride Rejected",
          message: "The trip has been rejected",
          type: "warning",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        //   this.gettrips()
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getuser = async (user_id) => {
    const resp = await axios({
      method: "post",
      url: "http://localhost:5000/driver/getuser",
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        console.log(res);
        const data = {
          name: res.data.data[0].name,
          phone: res.data.data[0].phone_no,
        };
        console.log(data);
        return data;
        // return <h3>{res.data.data[0].name}{res.data.data[0].phone}</h3>
      })
      .catch((e) => {
        console.log(e);
      });
    return resp;
  };

  gettrips = async () => {
    await axios({
      method: "post",
      url: "http://localhost:5000/driver/getrequests",
      data: {
        taxi_id: this.state.taxi_id,
      },
    })
      .then(async (res) => {
        console.log(res.data.data[0].r[0].from_s);
        const data = res.data.data;
        let tripd = [];
        for (let i = 0; i < res.data.data.length; i++) {
          let d = {};

          d["from_s"] = res.data.data[i].r[0].from_s;

          d["to_d"] = res.data.data[i].r[0].to_d;

          d["trip_id"] = res.data.data[i].r[0].trip_id;

          d["user_id"] = res.data.data[i].r[0].user_id;

          console.log(d);
          const userVal = await this.getuser(d["user_id"]);
          d["name"] = userVal.name;
          d["phone"] = userVal.phone;
          tripd.push(d);
        }

        await this.setState({
          tripDetails: tripd,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    this.setState({
      request: true,
    });
  };

  curtrip = (val, user) => {
    this.setState({
      c: val,
      user: user,
    });
  };

  approve = (trip) => {
    axios({
      method: "post",
      url: "http://localhost:5000/driver/approve",
      data: {
        trip_id: trip,
        start: "09:10:00",
        end: "09:40:00",
        duration: this.state.duration,
        fare: this.state.fare,
        user_id: this.state.user,
      },
    })
      .then((res) => {
        console.log(res);
        store.addNotification({
          title: "Approved successfully",
          message: "Ride has been accepted",
          type: "success",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        this.detailtoggle();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  modalOpen = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  detailtoggle = () => {
    this.setState({
      detail: !this.state.detail,
    });
  };

  getfare = (fare) => {
    this.setState({
      fare: fare.target.value,
    });
  };

  getduration = (d) => {
    this.setState({
      duration: d.target.value,
    });
  };

  render() {
    return (
      <div class="DriverPage1">
        <AppNavbar />

        <ReactNotification />
        <div className="Driver">
          <div class="jumbotron">
            <img
              alt="avatar"
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            />
            <h3>Hello {localStorage.getItem("driverName")}</h3>
            <hr class="w-100" />
            <div className="location">
              <button
                type="button"
                class="btn btn-outline-dark"
                onClick={this.getloc}
              >
                Current Location
              </button>
              {this.state && this.state.myloc ? (
                // <div style={{ height: "10px", width: "10px" }}>
                <h3 className="text-light">
                  {/* <img
                    alt="loc"
                    src="https://i.pinimg.com/originals/29/93/fd/2993fd151e2e1cab871aec155e22cbcc.png"
                    height="10px"
                    width="10px"
                  ></img>{" "} */}
                  <div style={{ color: "black" }}><h5>{this.state.myloc}</h5></div>
                </h3>
              ) : (
                // </div>
                <h6>Set Location Please</h6>
              )}
            </div>

            <hr class="w-100" />
            <b>
              My Shift:{" "}
              {this.state && this.state.shifts && (
                <h4>
                  {this.state.shifts[0].start} to {this.state.shifts[0].end}
                </h4>
              )}{" "}
            </b>
            <hr class="w-100" />
            <button
              type="button"
              class="btn btn-outline-dark"
              data-bs-toggle="modal"
              data-bs-target="#myModal1"
              onClick={() => {
                this.gettrips();
              }}
            >
              Trip Requests
            </button>
            <hr class="w-100" />
            <div className='taxi-location'>
            <button
              type="button"
              class="btn btn-outline-dark"
              data-bs-toggle="modal"
              data-bs-target="#myModal2"
            >
              My Taxi
            </button>
            <Location />
            </div>

            <div id="myModal" class="modal fade" role="dialog" tabIndex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Approve the trip</h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h6>Trip ID: {this.state && this.state.c}</h6>
                    <h6>
                      Fare{" "}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter fare"
                        onChange={this.getfare}
                      />
                    </h6>
                    <h6>
                      Duration{" "}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Duration (HH:MM:SS)"
                        onChange={this.getduration}
                      />
                    </h6>
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
                      onClick={() =>
                        this.approve(this.state.c, this.state.user)
                      }
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="myModal2" class="modal fade" role="dialog" tabIndex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">My Taxi</h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="ml-5">
                      {this.state && (
                        <h3>
                          {/* {console.log(this.state.taxi)} */}
                          <h4 className="display-4">
                            Volkswagen Vento<br></br>
                          </h4>
                          Type: {this.state.taxi.model}
                          <br></br>Color : {this.state.taxi.color} <br></br>
                          Number : {this.state.taxi.number}
                        </h3>
                      )}
                    </div>
                    <img
                      alt="car"
                      src="https://img2.pngio.com/white-sedan-illustration-transparent-png-svg-vector-file-white-sedan-car-png-512_512.png"
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            <div id="myModal1" class="modal fade" role="dialog" tabIndex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Active Trip Requests</h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {this.state &&
                    this.state.request &&
                    this.state.tripDetails ? (
                      this.state.tripDetails.map((val, k) => {
                        return (
                          <div>
                            <h6>Trip ID: {val.trip_id}</h6>
                            <h6>Name: {val.name}</h6>
                            <h6>Phone No: {val.phone}</h6>
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              data-bs-dismiss="modal"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={() => {
                                this.curtrip(val.trip_id, val.user_id);
                              }}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-danger"
                              data-bs-dismiss="modal"
                              onClick={() => this.decline(val.user_id)}
                            >
                              Reject
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <h3>No Active Requests</h3>
                      </div>
                    )}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
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
export default DriverPage;
