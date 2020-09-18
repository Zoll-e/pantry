import React from "react";
import Rating from "@material-ui/lab/Rating";

const CardFooter = ({ rating }) => {
  return (
    <div className="row justify-content">
      <div
        className="col-4"
        style={{ alignItems: "center", textAlign: "center" }}
      >
        <p>Ratings</p>
        <Rating value={rating} size={"small"} name="unique-rating" />
      </div>
      <div
        className="col-4"
        style={{ alignItems: "center", textAlign: "center" }}
      >
        <p>
          <i className="fas fa-clock"></i>
        </p>
        <p> 2:55</p>
      </div>
      <div
        className="col-4"
        style={{ alignItems: "center", textAlign: "center" }}
      >
        <p>
          <i className="fas fa-dollar-sign"></i>
        </p>
        <p> $$$</p>
      </div>
    </div>
  );
};

export default CardFooter;
