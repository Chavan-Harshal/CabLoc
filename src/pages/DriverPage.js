import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import {
  ListGroup,
  ListGroupItem,
  CardTitle,
  Jumbotron,
  Input,
} from "reactstrap";
import axios from "axios";
import { StarRating } from "baseui/rating";
import { Card } from "baseui/card";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "baseui/modal";
import "./DriverPage.css";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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
      taxi: [],
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
      url: "http://localhost:5000/api/mylocation",
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
      console.log(res.data);
      console.log("hello");
    });

    await axios;
    await axios({
      method: "post",
      url: "http://localhost:5000/gettaxi",
      data: {
        driver_id: localStorage.getItem("driverId"),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          taxi: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    await axios({
      method: "post",
      url: "http://localhost:5000/api/getshift",
      data: {
        driver_id: localStorage.getItem("driverId"),
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        shifts: res.data.shifts,
      });
    });

    await this.getloc();
  };

  decline = (trip_id) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/decline",
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
      url: "http://localhost:5000/api/getuser",
      data: {
        user_id: user_id,
      },
    })
      .then((res) => {
        console.log(res);
        const data = {
          name: res.data.data[0].name,
          phone: res.data.data[0].phone,
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
      url: "http://localhost:5000/api/getrequests",
      data: {
        taxi_id: this.state.taxi_id,
      },
    })
      .then(async (res) => {
        console.log(res);
        const data = res.data.data;
        await data.map(async (val, k) => {
          const userVal = await this.getuser(val.r[0].user_id);
          // if(val.r[0].from_s == c){
          //     // this.decline(val.r[0].trip_id)
          //     tripDetails.push(val)
          // }
          console.log(userVal);
          val.r.push(userVal);
          val.r[0].user = userVal.name;
          val.r[0].phone = userVal.phone;
        });
        await this.setState({
          tripDetails: data,
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
      url: "http://localhost:5000/api/approve",
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
        <div className="lead">
          <ReactNotification />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card className="w-1000" body inverse>
              <div
                class="driverProfile"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="profile"
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  height="200px"
                  width="200px"
                ></img>
                <br></br>
                <h2>Hello {localStorage.getItem("driverName")}</h2>
              </div>

              <CardTitle>
                <h2 className="display-3">
                  <h3>
                    <b>My Profile</b>
                  </h3>
                </h2>
              </CardTitle>
              <ListGroup>
                <ListGroupItem className="text-dark list-group-item list-group-item-action list-group-item-light">
                  <b>Name :</b> {localStorage.getItem("driverName")}
                </ListGroupItem>
                <ListGroupItem className="text-dark list-group-item list-group-item-action list-group-item-light">
                  <b>Phone Number: </b>
                  {this.state.d_phone_no}{" "}
                </ListGroupItem>
                <ListGroupItem className="text-dark list-group-item list-group-item-action list-group-item-light">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button class="btn btn-outline-secondary btn-lg mr-1">
                      Get Current Location
                    </button>
                    {this.state && this.state.myloc ? (
                      <h3 className="text-light">
                        <img
                          alt="loc"
                          src="https://i.pinimg.com/originals/29/93/fd/2993fd151e2e1cab871aec155e22cbcc.png"
                          height="40px"
                          width="40px"
                        ></img>{" "}
                        {this.state.myloc}
                      </h3>
                    ) : (
                      <button class="btn btn-outline-secondary btn-lg">
                        Set My Loaction
                      </button>
                    )}
                  </div>
                </ListGroupItem>
                <ListGroupItem className="text-dark list-group-item list-group-item-action list-group-item-light">
                  <b>Rating: </b>
                  <StarRating></StarRating>
                </ListGroupItem>
                <ListGroupItem className="text-dark list-group-item list-group-item-action list-group-item-light">
                  <div>
                    <b>My Shift:</b>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="text-dark list-group-item list-group-item-action list-group-item-lighty">
                  {/* <Location driver = {localStorage.getItem("driverId")}/>     */}
                </ListGroupItem>
              </ListGroup>
            </Card>
          </div>
        </div>
        <div>
          <div class="trip">
            <button
              class="btn btn-secondary btn-lg"
              onClick={() => {
                this.gettrips();
                this.modalOpen();
              }}
            >
              Get Trip Requests
            </button>
          </div>
          <h3>
            <b>My Taxi</b>
          </h3>
          <br></br>
          <div
            className="mt-0 pt-0"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="car"
              className="mr-5"
              src="https://img2.pngio.com/white-sedan-illustration-transparent-png-svg-vector-file-white-sedan-car-png-512_512.png"
              height="400px"
              width="400px"
            ></img>
            <div className="ml-5">
              {/* {this.state && (
                <h3>
                  <h4 className="display-4">
                    Volkswagen Vento<br></br>
                  </h4>
                  Type: {this.state.taxi.data[0].model}
                  <br></br>Color : {this.state.taxi.data[0].color} <br></br>
                  Number : {this.state.taxi.data[0].number}
                </h3>
              )} */}
            </div>
          </div>

          <Modal
            isOpen={this.state && this.state.detail}
            onClose={this.detailtoggle}
          >
            <ModalHeader onClose={this.detailtoggle}>
              Approve the trip
            </ModalHeader>
            <ModalBody>
              <h3 className="lead">Trip ID: {this.state && this.state.c}</h3>
              <h3 className="lead">
                Enter Fare<Input onChange={this.getfare}></Input>
              </h3>
              <h3 className="lead">
                Enter Duration(HH:MM:SS)
                <Input onChange={this.getduration}></Input>
              </h3>
            </ModalBody>
            <ModalFooter>
              <button
                class="btn btn-outline-secondary btn-lg"
                onClick={this.detailtoggle}
              >
                Cancel
              </button>
              <button
                class="btn btn-outline-secondary btn-lg"
                onClick={() => this.approve(this.state.c, this.state.user)}
              >
                Approve
              </button>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state && this.state.modal}
            onClose={this.modalOpen}
          >
            <ModalHeader toggle={this.modalOpen}>
              Active Trip Requests
            </ModalHeader>
            <ModalBody>
              {this.state && this.state.request && this.state.tripDetails ? (
                this.state.tripDetails.map((val, k) => {
                  return (
                    <div>
                      <h3>Trip ID: {val.r[0].user_id}</h3>
                      <h3>{val.r[0].user && <h3>Name: {val.r[0].user}</h3>}</h3>
                      <h3>
                        {val.r[0].phone && <h3>Phone No: {val.r[0].phone}</h3>}
                      </h3>
                      <button
                        class="btn btn-outline-secondary btn-lg"
                        onClick={() => {
                          this.curtrip(val.r[0].trip_id, val.r[0].user_id);
                          this.detailtoggle();
                        }}
                      >
                        Approve
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-lg"
                        className="text-dark"
                        onClick={() =>
                          this.decline(val.r[0].trip_id, val.r[0].user_id)
                        }
                      >
                        Reject
                      </button>
                    </div>
                  );
                })
              ) : (
                <h1>No Active Requests</h1>
              )}
            </ModalBody>
            <ModalFooter>
              <button
                class="btn btn-outline-secondary btn-lg"
                onClick={this.modalOpen}
              >
                Cancel
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
export default DriverPage;
