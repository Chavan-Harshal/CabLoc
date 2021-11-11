import React, { Component } from "react";
import Axios from "axios";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// import { StarRating } from "baseui/rating";
import ReactStars from "react-rating-stars-component";
import { BACKEND_URL } from "../config";

class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      user_id: localStorage.getItem("userId"),
      start: "",
      startN: "",
      end: "",
      endN: "",
      nearby: [],
      approved: false,
      request: false,
      rating: 1,
      ongoingTrip: [],
      card: "",
      zipcode: {},
    };
  }
  componentDidMount = async () => {
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
          zipcode: loc,
        });
      })
      .catch((e) => {
        console.log("error here");
        console.log(e);
      });
    await Axios({
      method: "get",
      url: "http://localhost:5000/customer/getlocation",
    })
      .then((res) => {
        console.log(res);
        this.setState({
          location: res.data.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getInput1 = (e) => {
    console.log("helksdfjl");
    console.log(e.target.value);
    const loc = this.parseZip(e.target.value);
    console.log(loc);
    this.setState({
      start: e.target.value,
      startN: loc,
    });
  };

  getTaxi = () => {
    console.log("heelo nikita");
    Axios({
      method: "post",
      url: "http://localhost:5000/customer/getnearby",
      data: {
        start: this.state.start,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.taxi.length != 0) {
          this.setState({
            nearby: res.data.taxi,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getInput2 = (e) => {
    console.log("helksdfjl");
    console.log(e.target.value);
    const loc = this.parseZip(e.target.value);
    console.log(loc);
    this.setState({
      end: e.target.value,
      endN: loc,
    });
  };

  getOngoing = async (trip) => {
    console.log(trip);
    await Axios({
      method: "post",
      url: "http://localhost:5000/customer/curtrip",
      data: {
        trip_id: trip,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          ongoingTrip: res.data.ongoing[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getReq = async () => {
    // await Axios({
    //   method: "post",
    //   url: "http://localhost:5000/customer/getlast",
    //   data: {
    //     user_id: this.state.user_id,
    //   },
    // }).then((res) => {
    //   console.log(res);
    //   localStorage.setItem("last", res.data);
    // });
    if (localStorage.getItem("last") === null) {
      await Axios({
        method: "post",
        url: "http://localhost:5000/customer/getongoing",
        data: {
          user_id: this.state.user_id,
        },
      })
        .then((res) => {
          console.log(res.data.ongoing[0].trip_id);
          localStorage.setItem("last", res.data.ongoing[0].trip_id);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    Axios({
      method: "post",
      url: "http://localhost:5000/customer/checkstatus",
      data: {
        user_id: this.state.user_id,
        trip_id: localStorage.getItem("last"),
      },
    }).then(async (res) => {
      if (res.data.msg === "approved") {
        console.log("Trip was approved");
        await this.getOngoing(localStorage.getItem("last"));
        store.addNotification({
          title: "Request was approved by driver",
          message: "Taxi was booked",
          type: "success",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        this.setState({
          approved: true,
        });
        localStorage.clear("last");
        console.log("Approved");
      } else if (res.data.msg === "wait") {
        store.addNotification({
          title: "Waiting for driver confirmation",
          message: "Awaiting confirmation",
          type: "warning",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        console.log("Waiting");
        this.setState({
          approved: false,
        });
      } else {
        store.addNotification({
          title: "Oops no pending trips!",
          message: "There are no pending trips",
          type: "warning",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        console.log("Declined");
        this.setState({
          approved: false,
        });
      }
    });
  };

  book = (taxi) => {
    const trip_id = Math.floor(Math.random() * 1000000).toString();
    console.log(this.props.data);
    localStorage.setItem("last", trip_id);
    Axios({
      method: "post",
      url: "http://localhost:5000/customer/booktrip",
      data: {
        user_id: localStorage.getItem("userId"),
        taxi_id: taxi,
        from_s: this.state.start,
        to_d: this.state.end,
        trip_id: trip_id,
      },
    })
      .then((res) => {
        console.log(res);
        store.addNotification({
          title: "Requested new ride",
          message: "Waiting for Driver Confirmation",
          type: "success",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        this.setState({
          request: true,
        });
      })
      .catch((e) => {
        store.addNotification({
          title: "Error",
          message: "Try again",
          type: "danger",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        console.log(e);
      });
  };
  // changeRating = (e) => {
  //   this.setState({
  //     rating: e.value,
  //   });
  // };

  ratingChanged = (e) => {
    console.log(e);
    // console.log(e.target.value);
    this.setState({
      rating: e,
    });
  };

  parseDuration = (d) => {
    const hr = d.slice(0, 2);
    const min = d.slice(3, 5);
    if (hr === "00") {
      return `${min} Minute(s)`;
    }
    return `${hr} Hour(s) ${min} Minute(s)`;
  };

  parseZip = (z) => {
    console.log(this.state.location);
    for (let i = 0; i < this.state.location.length; i++) {
      if (this.state.location[i].zipcode == z) {
        return this.state.location[i].loc_name;
      }
    }
    return "not found";
  };

  done = () => {
    const data = {
      rating: this.state.rating,
      trip_id: this.state.ongoingTrip.trip_id,
    };
    Axios({
      method: "post",
      url: "http://localhost:5000/customer/setrating",
      data: data,
    })
      .then((res) => {
        console.log(res);
        // store.addNotification({
        //   title: "Trip ended successfully",
        //   message: "Thank you for the trip",
        //   type: "success",
        // });
        store.addNotification({
          title: "Trip ended successfully",
          message: "Thank you for the trip",
          type: "success",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
        });
        this.getOngoing();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  setCard = (c) => {
    this.setState({
      card: c.target.value,
    });
  };

  render() {
    return (
      <div>
        <ReactNotification />
        <div className="UserTrip">
          <button
            type="button"
            className="btn btn-outline-dark"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            Start a new trip
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Book a trip</h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">
                  Source
                </label>
                <select
                  class="form-select"
                  id="inputGroupSelect01"
                  // value={this.state.start}
                  onChange={this.getInput1}
                >
                  <option selected>Choose...</option>
                  {this.state.location.map((val, k) => {
                    return (
                      <option value={val.zipcode}>
                        {val.loc_name}
                        {/* {val.zipcode} */}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">
                  Destination
                </label>
                <select
                  class="form-select"
                  id="inputGroupSelect01"
                  // value={this.state.start}
                  onChange={this.getInput2}
                >
                  <option selected>Choose...</option>
                  {this.state.location.map((val, k) => {
                    return (
                      <option value={val.zipcode}>
                        {val.loc_name}
                        {/* {val.zipcode} */}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                type="button"
                class="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                onClick={() => {
                  this.getTaxi();
                }}
              >
                Check for taxis
              </button>
            </div>
          </div>
          <div id="myModal" class="modal fade" role="dialog" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Available taxis</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {console.log(this.state.nearby)}
                  {this.state.nearby.map((val, k) => {
                    return (
                      <div>
                        <h3>
                          <b>Driver Name: </b>
                          {val.d_name}
                        </h3>
                        <h3>
                          <b>Phone no: </b>
                          {val.d_phone_no}
                        </h3>
                        <h3>
                          <b>Model: </b>
                          {val.model}
                          <b>Taxi no: </b>
                          {val.number}
                          <b>Color: </b>
                          {val.color}
                        </h3>
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          onClick={() => {
                            this.book(val.taxi_id);
                          }}
                        >
                          Book
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={this.getReq}
          >
            Check trip requests
          </button>
          {this.state.approved && (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Ongoing trip</h3>
                <h3>
                  {/* <img
                    alt="icon"
                    src="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png"
                  ></img>{" "} */}
                  To: {this.state.zipcode[this.state.ongoingTrip.to_d]}
                </h3>
                <h3>
                  {/* <img
                    alt="icon"
                    src="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png"
                  ></img>{" "} */}
                  From: {this.state.zipcode[this.state.ongoingTrip.from_s]}
                </h3>
                <h3>
                  {/* <img
                    alt="icon"
                    src="https://www.iconsdb.com/icons/preview/white/indian-rupee-xxl.png"
                  ></img>{" "} */}
                  Fare: ₹{this.state.ongoingTrip.fare}
                </h3>
              </div>
              <button
                type="button"
                class="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#mymodal1"
              >
                End trip
              </button>
              <div
                id="mymodal1"
                className="modal fade"
                role="dialog"
                tabIndex="-1"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Complete trip</h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h3>Thank you for riding with us</h3>
                      <h5>Enter card number to complete payment</h5>
                      <div className="d-flex flex-row align-items-center mb-4 pb-1">
                        <img
                          className="img-fluid"
                          src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                          // style={{
                          //   width: "60px",
                          //   height: "50px",
                          //   // marginLeft: "30%",
                          // }}
                        />
                        <div class="flex-fill mx-3">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="formControlLgXc"
                              className="form-control form-control-lg"
                              value={this.state.card}
                              onChange={this.setCard}
                            />
                            <label className="form-label" for="formControlLgXc">
                              Card Number
                            </label>
                          </div>
                        </div>
                      </div>
                      <h3>Rate your trip</h3>
                      <div
                        style={{
                          marginLeft: "31%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ReactStars
                          count={5}
                          onChange={this.ratingChanged}
                          size={50}
                          activeColor="#ffd700"
                        />
                      </div>
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
                        onClick={this.done}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserLocation;
