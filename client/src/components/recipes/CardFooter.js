import React from "react";

const CardFooter = () => {
  return (
    <div className="row justify-content" >
      <div className="col-4" style={{alignItems:"center",textAlign:"center"}}>
        <p>time</p>
        <p> 2:55</p>
      </div>
      <div className="col-4" style={{alignItems:"center",textAlign:"center"}}>
        <p>likes</p>
        <p> 55</p>
      </div>
      <div className="col-4" style={{alignItems:"center",textAlign:"center"}}>
        <p>price</p>
        <p> $$$</p>
      </div>
      
     
    </div>
  );
};

export default CardFooter;
