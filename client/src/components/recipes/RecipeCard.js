import React from "react";
import Picture from "./Picture";
import { Link } from "react-router-dom";
import CardFooter from "./CardFooter";

function Card({ recipe: { _id, dish, picture } }) {
  const pictureStyles = { width: "100%", height: "65%", position: "relative" };
  const cardStyle = { width: "300px" };
  const pictureSource = `/api/photos/${picture}`;
  //      <Link to={`/recipe/${_id}`} className="col-12" style={{bottom:"0px",position:"absolute"}}>Link</Link>

  return (
    <div className="card" style={cardStyle}>
      <Picture src={pictureSource}  styles={pictureStyles} />
      <h2 className="col-12">{dish}</h2>
      <CardFooter />
    </div>
  );
}

export default Card;
