import React from "react";
import { Component } from "react";
// import { StarRating } from "baseui/rating";
// import "react-star-rating/dist/css/react-star-rating.min.css";
// import StarRating from "react-star-rating";
import ReactStars from "react-rating-stars-component";
class temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
    };
  }

  ratingChanged = (e) => {
    this.setState({
      rating: e.value,
    });
  };

  //   handleRatingClick = (e, data) => {
  //     alert("You left a " + data.rating + " star rating for " + data.caption);
  //   };

  // <StarRating name="handler" caption="Use onClick Handlers!" totalStars={5} onRatingClick={handleRatingClick} />

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Ongoing trip</h3>
          <h3>
            {/* <img
                    alt="icon"
                    src="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png"
                  ></img>{" "} */}
            To: pune
          </h3>
          <h3>
            {/* <img
                    alt="icon"
                    src="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png"
                  ></img>{" "} */}
            From: nagar
          </h3>
          <h3>
            {/* <img
              alt="icon"
              src="https://www.iconsdb.com/icons/preview/white/indian-rupee-xxl.png"
            ></img>{" "} */}
            Fare: ₹100
          </h3>
          {/* <StarRating
            name="react-star-rating"
            caption="Rate this component!"
            totalStars={5}
          /> */}
          <ReactStars
            count={5}
            onChange={this.ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        </div>

        <button
          type="button"
          class="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#mymodal1"
        >
          End trip
        </button>
      </div>
    );
  }
}

export default temp;
