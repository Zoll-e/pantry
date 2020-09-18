import React from "react";
import CardFooter from "../recipes/CardFooter";
import {useHistory} from "react-router-dom";

function Card({ recipe: {_id, dish, intro, rating, likes, picture } }) {
  
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `/recipe/${_id}`; 
    history.push(path);
  }

  return (
    <div className="col-md-3" onClick={routeChange}>
      <div className="flipcard">
        <div className="flipcard-wrap">
          <div className="card card-front">
            <img
              src={
                picture
                  ? picture
                  : "https://i.ebayimg.com/images/g/COYAAOSwrANco-hM/s-l640.jpg"
              }
              alt=""
              className="card-img-top"
              style={{ width: "100%", height: "200px" }}
            />
            <div className="card-body">
              <h5>{dish}</h5>
              <CardFooter rating={rating} likes={likes} />
            </div>
          </div>
          <div className="card card-back">
            <div className="card-body">{intro}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
