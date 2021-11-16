import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";

import "./About.css";

class About extends Component {
  render() {
    return (
      <div class="About1">
        <AppNavbar />
        <div class="info">
            <h1>
              <b>About us</b>
            </h1>
            <h2>CabLoc: Taxi Management service</h2>
            <div class="paragraph">
              <p>
                With the increasing demand of online services, the taxi booking
                services have emerged to be one of the primary sectors where
                databases are employed heavily. Although there is a lot of
                optimizations and tools being deployed for the major real-life
                use cases, a simple and basic version of the same design pattern
                is aimed at by this project.{" "}
              </p>
              <p>
                The major focus of <i>CabLoc</i> is to simulate a smaller case
                scenario of a location based reactive system. The basic
                requirement of the entire project will rely heavily on the
                database design and the way the data is represented for the
                needed services.
              </p>
              <p>
                <i>CabLoc</i> will provide a similar web-interface wherein a
                customer can book taxis that are in a proximity to their current
                location and create trips to new locations.Also drivers can view
                their profile and can accept/reject trip requests through home
                page. Admins of the system can add drivers and also can see the
                garage status of the vehicles.
              </p>
              Our App consists of three interfaces:
              <ol>
                <li>
                  Admin
                  <ul>
                    <li>Add Drivers</li>
                    <li>View the Garage Status</li>
                  </ul>
                </li>
                <br></br>
                <li>
                  Customer
                  <ul>
                    <li>Can login/register into the system</li>
                    <li>
                      The customer can request for new trips from the home
                      screen
                    </li>
                    <li>
                      The source and destination of the trips can be selected
                      and the nearby taxis will be listed.
                    </li>
                    <li>
                      From the list one taxi can be selected and the driver will
                      be notified about the request.
                    </li>
                    <li>The status of booking can be viewed.</li>
                    <li>
                      Once the driver approves the request then then trip will
                      be started.
                    </li>
                    <li>
                      The trip can be ended by the customer by providing rating
                      and payment details.
                    </li>
                  </ul>
                </li>
                <br></br>
                <li>
                  Driver
                  <ul>
                    <li>
                      Can login to the system and view their profile. Profile
                      contains details about name, phone number, current
                      location, rating, their vehicle, information about the
                      vehicle etc.
                    </li>
                    <li>Can update current location from the home screen.</li>
                    <li>
                      All the trip requests to the driver can be seen in
                      requests list.
                    </li>
                    <li>
                      The driver can approve the trip and select fare and
                      duration of the ride.
                    </li>
                    <li>
                      The driver will get rating after completing the trip.
                    </li>
                  </ul>
                </li>
              </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
