import React from "react";
import Picture from "./Picture";
import { Link } from "react-router-dom";
import CardFooter from "./CardFooter";

function Card({ recipe: { _id, dish, picture } }) {
  const pictureStyles = { width: "100%", height: "55%", position: "relative" };
  const cardStyle = { width: "300px",height:"300px" };

  return (
    <div className="card" style={cardStyle}>
      <Picture src={picture}  styles={pictureStyles} />
      <h2 className="col-12">{dish}</h2>
      <CardFooter />
    </div>
  );
}

export default Card;
